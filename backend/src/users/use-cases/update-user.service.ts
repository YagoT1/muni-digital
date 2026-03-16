import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User, UserRole } from '../user.entity'
import { UpdateAdminUserDto } from '../dto/update-admin-user.dto'
import {
  normalizeCuil,
  normalizeDocumentNumber,
  normalizeEmail,
  normalizeText,
} from '../users.utils'

@Injectable()
export class UpdateUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async execute(userId: number, dto: UpdateAdminUserDto) {
    const user = await this.usersRepo.findOne({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')

    if (dto.email !== undefined) {
      const normalizedEmail = normalizeEmail(dto.email)
      const existing = await this.usersRepo.findOne({ where: { email: normalizedEmail } })
      if (existing && existing.id !== userId) throw new BadRequestException('Email already in use')
      user.email = normalizedEmail
    }

    if (dto.dni !== undefined) {
      const normalizedDni = normalizeDocumentNumber(dto.dni)
      const existingDni = await this.usersRepo.findOne({ where: { dni: normalizedDni } })
      if (existingDni && existingDni.id !== userId) throw new BadRequestException('DNI already in use')
      user.dni = normalizedDni
    }

    if (dto.cuil !== undefined) {
      const normalizedCuil = normalizeCuil(dto.cuil)
      if (normalizedCuil) {
        const existingCuil = await this.usersRepo.findOne({ where: { cuil: normalizedCuil } })
        if (existingCuil && existingCuil.id !== userId) throw new BadRequestException('CUIL already in use')
      }
      user.cuil = normalizedCuil ?? null
    }

    if (dto.password !== undefined) {
      user.password = await bcrypt.hash(dto.password, 10)
    }

    const nextLegajo = dto.legajo !== undefined ? normalizeText(dto.legajo) ?? null : user.legajo
    const nextRole = dto.role ?? user.role
    if (nextRole === UserRole.EMPLEADO && !nextLegajo) {
      throw new BadRequestException('Legajo is required for empleado role')
    }

    if (dto.birthDate !== undefined) user.birthDate = new Date(dto.birthDate)
    if (dto.firstName !== undefined) user.firstName = normalizeText(dto.firstName) ?? null
    if (dto.lastName !== undefined) user.lastName = normalizeText(dto.lastName) ?? null
    if (dto.country !== undefined) user.country = dto.country.trim()
    if (dto.province !== undefined) user.province = dto.province.trim()
    if (dto.city !== undefined) user.city = dto.city.trim()
    if (dto.phone !== undefined) user.phone = normalizeText(dto.phone) ?? null
    if (dto.addressLine1 !== undefined) user.addressLine1 = normalizeText(dto.addressLine1) ?? null
    if (dto.addressLine2 !== undefined) user.addressLine2 = normalizeText(dto.addressLine2) ?? null
    if (dto.postalCode !== undefined) user.postalCode = normalizeText(dto.postalCode) ?? null
    if (dto.documentType !== undefined) user.documentType = dto.documentType
    if (dto.documentNumber !== undefined) user.documentNumber = normalizeText(dto.documentNumber) ?? null
    if (dto.gender !== undefined) user.gender = dto.gender
    if (dto.role !== undefined) user.role = dto.role
    if (dto.legajo !== undefined) user.legajo = nextLegajo
    if (dto.isActive !== undefined) user.isActive = dto.isActive
    if (dto.isVerified !== undefined) user.isVerified = dto.isVerified

    const saved = await this.usersRepo.save(user)
    const { password: _password, ...safe } = saved
    return safe
  }
}
