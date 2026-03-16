import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../user.entity'

@Injectable()
export class UserStatsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async execute() {
    const total = await this.usersRepo.count()
    const active = await this.usersRepo.count({ where: { isActive: true } })
    const inactive = total - active

    const byRoleRows = await this.usersRepo
      .createQueryBuilder('u')
      .select('u.role', 'role')
      .addSelect('COUNT(*)::int', 'count')
      .groupBy('u.role')
      .getRawMany<{ role: string; count: number }>()

    const byRole = byRoleRows.reduce<Record<string, number>>((acc, row) => {
      acc[row.role] = Number(row.count)
      return acc
    }, {})

    return { total, active, inactive, byRole }
  }
}
