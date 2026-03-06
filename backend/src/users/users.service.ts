// src/users/users.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserRole } from './user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // -----------------------------
  // Normalización (escala / calidad de datos)
  // -----------------------------
  normalizeEmail(email: string): string {
    return (email ?? '').trim().toLowerCase()
  }

  normalizeText(value?: string | null): string | undefined {
    if (value === null || value === undefined) return undefined
    const v = String(value).trim()
    return v.length ? v : undefined
  }

  normalizeDocumentNumber(value: string): string {
    return (value ?? '').replace(/\D/g, '').trim()
  }

  normalizeCuil(value?: string | null): string | undefined {
    if (!value) return undefined
    const onlyDigits = value.replace(/\D/g, '').trim()
    return onlyDigits.length ? onlyDigits : undefined
  }

  // -----------------------------
  // CRUD base
  // -----------------------------
  async create(data: Partial<User>) {
    const user = this.usersRepo.create(data)
    return this.usersRepo.save(user)
  }

  async findById(id: number) {
    const user = await this.usersRepo.findOne({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return user
  }

  async findAll() {
    return this.usersRepo.find()
  }

  // -----------------------------
  // SAFE: sin password
  // -----------------------------
  toSafePublic(user: User) {
    const { password, ...safe } = user as any
    return safe
  }

  toSafePrivate(user: User) {
    const { password, ...safe } = user as any
    return safe
  }

  toSafe(user: User) {
    // Punto único para exponer la versión "segura" del usuario
    return this.toSafePrivate(user)
  }

  // -----------------------------
  // Búsquedas específicas
  // -----------------------------
  async findByEmail(email: string) {
    const normalized = this.normalizeEmail(email)
    return this.usersRepo.findOne({ where: { email: normalized } })
  }

  async findByEmailWithPassword(email: string) {
    const normalized = this.normalizeEmail(email)

    return this.usersRepo
      .createQueryBuilder('u')
      .where('u.email = :email', { email: normalized })
      .addSelect('u.password')
      .getOne()
  }

  async findByDni(dni: string) {
    const documentNumber = this.normalizeDocumentNumber(dni)
    return this.usersRepo.findOne({ where: { dni: documentNumber } })
  }

  // Alias para AuthService enterprise
  async findByDocumentNumber(documentNumber: string) {
    // si en el futuro querés diferenciar, acá lo ajustás
    return this.usersRepo.findOne({ where: { documentNumber } })
  }

  async findByCuil(cuil?: string) {
    const normalized = this.normalizeCuil(cuil)
    if (!normalized) return null
    return this.usersRepo.findOne({ where: { cuil: normalized } })
  }

  // -----------------------------
  // Admin Ops
  // -----------------------------
  async findAllSafe() {
    const users = await this.findAll()
    return users.map((user) => this.toSafe(user))
  }

  async setRole(userId: number, role: UserRole) {
    const user = await this.findById(userId)

    // Regla empresarial mínima: no permitir degradar el único admin (opcional)
    // Si querés, lo activamos después. Por ahora, directo.
    user.role = role
    const saved = await this.usersRepo.save(user)
    return this.toSafe(saved)
  }

  async setActive(userId: number, isActive: boolean) {
    const user = await this.findById(userId)
    user.isActive = isActive
    const saved = await this.usersRepo.save(user)
    return this.toSafe(saved)
  }

  async resetPassword(userId: number) {
    const user = await this.findById(userId)

    // Password temporal (solo DEV/QA). En PROD: flujo por email.
    const tempPassword = this.generateTempPassword(12)
    user.password = await bcrypt.hash(tempPassword, 10)

    await this.usersRepo.save(user)

    return {
      ok: true,
      tempPassword, // si no querés devolverla, la quitamos y logueamos por consola (no recomendado).
    }
  }

  private generateTempPassword(length = 12) {
    const chars =
      'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%*?'
    let out = ''
    for (let i = 0; i < length; i++) {
      out += chars[Math.floor(Math.random() * chars.length)]
    }
    // hardening mínimo
    if (out.length < 8) throw new BadRequestException('Temp password too short')
    return out
  }
}