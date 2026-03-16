import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User, UserRole } from './user.entity'
import { CreateAdminUserDto } from './dto/create-admin-user.dto'
import { UpdateAdminUserDto } from './dto/update-admin-user.dto'
import { CreateUserService } from './use-cases/create-user.service'
import { UpdateUserService } from './use-cases/update-user.service'
import { ResetPasswordService } from './use-cases/reset-password.service'
import { UserStatsService } from './use-cases/user-stats.service'
import {
  normalizeCuil,
  normalizeDocumentNumber,
  normalizeEmail,
  normalizeText,
} from './users.utils'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly resetPasswordService: ResetPasswordService,
    private readonly userStatsService: UserStatsService,
  ) {}

  normalizeEmail(email: string): string {
    return normalizeEmail(email)
  }

  normalizeText(value?: string | null): string | undefined {
    return normalizeText(value)
  }

  normalizeDocumentNumber(value: string): string {
    return normalizeDocumentNumber(value)
  }

  normalizeCuil(value?: string | null): string | undefined {
    return normalizeCuil(value)
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

  toSafe(user: User) {
    const { password, ...safe } = user as User & { password?: string }
    return safe
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

  async findByCuil(cuil?: string) {
    const normalized = this.normalizeCuil(cuil)
    if (!normalized) return null
    return this.usersRepo.findOne({ where: { cuil: normalized } })
  }

  async findAllSafe() {
    const users = await this.findAll()
    return users.map((user) => this.toSafe(user))
  }

  async findPaginatedSafe(page = 1, limit = 20) {
    const normalizedPage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
    const normalizedLimit = Math.min(100, Math.max(1, Math.floor(limit || 20)))

    const [items, total] = await this.usersRepo.findAndCount({
      skip: (normalizedPage - 1) * normalizedLimit,
      take: normalizedLimit,
      order: { id: 'DESC' },
    })

    return {
      items: items.map((u) => this.toSafe(u)),
      total,
      page: normalizedPage,
      totalPages: Math.max(1, Math.ceil(total / normalizedLimit)),
    }
  }

  async getAdminStats() {
    return this.userStatsService.execute()
  }

  async createByAdmin(dto: CreateAdminUserDto) {
    return this.createUserService.execute(dto)
  }

  async updateByAdmin(userId: number, dto: UpdateAdminUserDto) {
    return this.updateUserService.execute(userId, dto)
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
    return this.resetPasswordService.execute(userId, newPassword)
  }
}
