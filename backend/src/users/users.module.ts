import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { CreateUserService } from './use-cases/create-user.service'
import { UpdateUserService } from './use-cases/update-user.service'
import { ResetPasswordService } from './use-cases/reset-password.service'
import { UserStatsService } from './use-cases/user-stats.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    CreateUserService,
    UpdateUserService,
    ResetPasswordService,
    UserStatsService,
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
