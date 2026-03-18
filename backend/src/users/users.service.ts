import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserRole } from './user.entity'
import * as bcrypt from 'bcrypt'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  // =========================
  // NORMALIZADORES (FIX)
  // =========================

  normalizeEmail(email: string): string {
    return email?.trim().toLowerCase()
  }

  normalizeText(value?: string | null): string | undefined {
    if (!value) return undefined
    return value.trim()
  }

  normalizeDocumentNumber(value: string): string {
    return value?.replace(/\D/g, '')
  }

  normalizeCuil(value?: string | null): string | undefined {
    if (!value) return undefined
    return value.replace(/\D/g, '')
  }

  // =========================
  // CRUD BASE
  // =========================

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

  // =========================
  // SAFE RESPONSES
  // =========================

  toSafePublic(user: User) {
    const { password, ...safe } = user as User & { password?: string }
    return safe
  }

  toSafePrivate(user: User) {
    const { password, ...safe } = user as User & { password?: string }
    return safe
  }

  toSafe(user: User) {
    return this.toSafePrivate(user)
  }

  // =========================
  // FINDERS
  // =========================

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

  async findByDocumentNumber(documentNumber: string) {
    return this.usersRepo.findOne({ where: { documentNumber } })
  }

  async findByCuil(cuil?: string) {
    const normalized = this.normalizeCuil(cuil)
    if (!normalized) return null
    return this.usersRepo.findOne({ where: { cuil: normalized } })
  }

  async findAllSafe() {
    const users = await this.findAll()
    return users.map((user) => this.toSafe(user))
  }

  // =========================
  // PAGINACIÓN (FIX CLAVE)
  // =========================

  async findPaginatedSafe(page = 1, limit = 20) {
    const [items, total] = await this.usersRepo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      items: items.map((u) => this.toSafe(u)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  // =========================
  // ADMIN STATS
  // =========================

  async getAdminStats() {
    const users = await this.findAll()
    const total = users.length
    const active = users.filter((u) => u.isActive).length
    const inactive = total - active

    const byRole = users.reduce<Record<string, number>>((acc, user) => {
      acc[user.role] = (acc[user.role] ?? 0) + 1
      return acc
    }, {})

    return {
      total,
      active,
      inactive,
      byRole,
    }
  }

  // =========================
  // ADMIN CREATE
  // =========================

  async createByAdmin(dto: CreateAdminUserDto) {
    const email = this.normalizeEmail(dto.email)
    const existing = await this.findByEmail(email)
    if (existing) throw new BadRequestException('Email already in use')

    const dni = dto.dni ? this.normalizeDocumentNumber(dto.dni) : undefined
    if (dni) {
      const existingDni = await this.findByDni(dni)
      if (existingDni) throw new BadRequestException('DNI already in use')
    }

    const cuil = this.normalizeCuil(dto.cuil)
    if (cuil) {
      const existingCuil = await this.findByCuil(cuil)
      if (existingCuil) throw new BadRequestException('CUIL already in use')
    }

    const selectedRole = dto.role ?? UserRole.CIUDADANO
    const normalizedLegajo = this.normalizeText(dto.legajo)
    if (selectedRole === UserRole.EMPLEADO && !normalizedLegajo) {
      throw new BadRequestException('Legajo is required for empleado role')
    }

    const password = await bcrypt.hash(dto.password, 10)

    const created = await this.create({
      firstName: this.normalizeText(dto.firstName) ?? null,
      lastName: this.normalizeText(dto.lastName) ?? null,
      dni: dni ?? null,
      birthDate: new Date(dto.birthDate),
      email,
      password,
      country: dto.country.trim(),
      province: dto.province.trim(),
      city: dto.city.trim(),
      phone: this.normalizeText(dto.phone) ?? null,
      addressLine1: this.normalizeText(dto.addressLine1) ?? null,
      addressLine2: this.normalizeText(dto.addressLine2) ?? null,
      postalCode: this.normalizeText(dto.postalCode) ?? null,
      cuil: cuil ?? null,
      documentType: dto.documentType ?? null,
      documentNumber: this.normalizeText(dto.documentNumber) ?? null,
      gender: dto.gender ?? null,
      role: selectedRole,
      legajo: normalizedLegajo ?? null,
      isActive: dto.isActive ?? true,
      isVerified: dto.isVerified ?? false,
    })

    return this.toSafe(created)
  }

  // =========================
  // ADMIN UPDATE
  // =========================

  async updateByAdmin(userId: number, dto: UpdateAdminUserDto) {
    const user = await this.findById(userId)

    if (dto.email !== undefined) {
      const normalizedEmail = this.normalizeEmail(dto.email)
      const existing = await this.findByEmail(normalizedEmail)
      if (existing && existing.id !== userId) {
        throw new BadRequestException('Email already in use')
      }
      user.email = normalizedEmail
    }

    if (dto.password !== undefined) {
      user.password = await bcrypt.hash(dto.password, 10)
    }

    const saved = await this.usersRepo.save(user)
    return this.toSafe(saved)
  }

  // =========================
  // FLAGS
  // =========================

  async setRole(userId: number, role: UserRole) {
    const user = await this.findById(userId)
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

  // =========================
  // PASSWORD
  // =========================

  async resetPassword(userId: number, newPassword: string) {
    const user = await this.findById(userId)

    const trimmedPassword = (newPassword ?? '').trim()
    this.assertPasswordPolicy(trimmedPassword)

    user.password = await bcrypt.hash(trimmedPassword, 10)
    await this.usersRepo.save(user)

    return {
      ok: true,
      message: 'Password updated successfully',
    }
  }

  private assertPasswordPolicy(password: string) {
    if (password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long')
    }

    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /\d/.test(password)

    if (!hasLetter || !hasNumber) {
      throw new BadRequestException(
        'Password must contain at least one letter and one number',
      )
    }
  }
}