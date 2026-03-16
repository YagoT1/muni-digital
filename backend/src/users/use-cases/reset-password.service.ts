import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { User } from '../user.entity'
import { assertPasswordPolicy } from '../users.utils'

@Injectable()
export class ResetPasswordService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  async execute(userId: number, newPassword: string) {
    const user = await this.usersRepo.findOne({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')

    const trimmedPassword = (newPassword ?? '').trim()
    assertPasswordPolicy(trimmedPassword)

    user.password = await bcrypt.hash(trimmedPassword, 10)
    await this.usersRepo.save(user)

    return { ok: true, message: 'Password updated successfully' }
  }
}
