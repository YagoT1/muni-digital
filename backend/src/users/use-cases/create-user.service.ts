import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User, UserRole } from '../user.entity'
import { CreateAdminUserDto } from '../dto/create-admin-user.dto'
import {
  normalizeCuil,
  normalizeDocumentNumber,
  normalizeEmail,
  normalizeText,
} from '../users.utils'

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async execute(dto: CreateAdminUserDto) {
    const email = normalizeEmail(dto.email)
    const existing = await this.usersRepo.findOne({ where: { email } })
    if (existing) throw new BadRequestException('Email already in use')

    const dni = dto.dni ? normalizeDocumentNumber(dto.dni) : undefined
    if (dni) {
      const existingDni = await this.usersRepo.findOne({ where: { dni } })
      if (existingDni) throw new BadRequestException('DNI already in use')
    }

    const cuil = normalizeCuil(dto.cuil)
    if (cuil) {
      const existingCuil = await this.usersRepo.findOne({ where: { cuil } })
      if (existingCuil) throw new BadRequestException('CUIL already in use')
    }

    const selectedRole = dto.role ?? UserRole.CIUDADANO
    const normalizedLegajo = normalizeText(dto.legajo)
    if (selectedRole === UserRole.EMPLEADO && !normalizedLegajo) {
      throw new BadRequestException('Legajo is required for empleado role')
    }

    const password = await bcrypt.hash(dto.password, 10)

    const user = this.usersRepo.create({
      firstName: normalizeText(dto.firstName) ?? null,
      lastName: normalizeText(dto.lastName) ?? null,
      dni: dni ?? null,
      birthDate: new Date(dto.birthDate),
      email,
      password,
      country: dto.country.trim(),
      province: dto.province.trim(),
      city: dto.city.trim(),
      phone: normalizeText(dto.phone) ?? null,
      addressLine1: normalizeText(dto.addressLine1) ?? null,
      addressLine2: normalizeText(dto.addressLine2) ?? null,
      postalCode: normalizeText(dto.postalCode) ?? null,
      cuil: cuil ?? null,
      documentType: dto.documentType ?? null,
      documentNumber: normalizeText(dto.documentNumber) ?? null,
      gender: dto.gender ?? null,
      role: selectedRole,
      legajo: normalizedLegajo ?? null,
      isActive: dto.isActive ?? true,
      isVerified: dto.isVerified ?? false,
    })

    const saved = await this.usersRepo.save(user)
    const { password: _password, ...safe } = saved
    return safe
  }
}
