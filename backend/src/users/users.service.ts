// src/users/users.service.ts
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

    if (dto.dni !== undefined) {
      const normalizedDni = this.normalizeDocumentNumber(dto.dni)
      const existingDni = await this.findByDni(normalizedDni)
      if (existingDni && existingDni.id !== userId) {
        throw new BadRequestException('DNI already in use')
      }
      user.dni = normalizedDni
    }

    if (dto.cuil !== undefined) {
      const normalizedCuil = this.normalizeCuil(dto.cuil)
      if (normalizedCuil) {
        const existingCuil = await this.findByCuil(normalizedCuil)
        if (existingCuil && existingCuil.id !== userId) {
          throw new BadRequestException('CUIL already in use')
        }
      }
      user.cuil = normalizedCuil ?? null
    }

    if (dto.password !== undefined) {
      user.password = await bcrypt.hash(dto.password, 10)
    }

    const nextLegajo =
      dto.legajo !== undefined
        ? this.normalizeText(dto.legajo) ?? null
        : user.legajo
    const nextRole = dto.role ?? user.role
    if (nextRole === UserRole.EMPLEADO && !nextLegajo) {
      throw new BadRequestException('Legajo is required for empleado role')
    }

    if (dto.birthDate !== undefined) user.birthDate = new Date(dto.birthDate)
    if (dto.firstName !== undefined) user.firstName = this.normalizeText(dto.firstName) ?? null
    if (dto.lastName !== undefined) user.lastName = this.normalizeText(dto.lastName) ?? null
    if (dto.country !== undefined) user.country = dto.country.trim()
    if (dto.province !== undefined) user.province = dto.province.trim()
    if (dto.city !== undefined) user.city = dto.city.trim()
    if (dto.phone !== undefined) user.phone = this.normalizeText(dto.phone) ?? null
    if (dto.addressLine1 !== undefined)
      user.addressLine1 = this.normalizeText(dto.addressLine1) ?? null
    if (dto.addressLine2 !== undefined)
      user.addressLine2 = this.normalizeText(dto.addressLine2) ?? null
    if (dto.postalCode !== undefined)
      user.postalCode = this.normalizeText(dto.postalCode) ?? null
    if (dto.documentType !== undefined) user.documentType = dto.documentType
    if (dto.documentNumber !== undefined)
      user.documentNumber = this.normalizeText(dto.documentNumber) ?? null
    if (dto.gender !== undefined) user.gender = dto.gender
    if (dto.role !== undefined) user.role = dto.role
    if (dto.legajo !== undefined) user.legajo = nextLegajo
    if (dto.isActive !== undefined) user.isActive = dto.isActive
    if (dto.isVerified !== undefined) user.isVerified = dto.isVerified

    const saved = await this.usersRepo.save(user)
    return this.toSafe(saved)
  }

  async setRole(userId: number, role: UserRole) {
    const user = await this.findById(userId)

    if (role === UserRole.EMPLEADO && !this.normalizeText(user.legajo)) {
      throw new BadRequestException('Legajo is required for empleado role')
    }

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
