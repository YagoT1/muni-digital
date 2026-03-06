// src/users/dto/update-role.dto.ts
import { IsEnum } from 'class-validator'
import { UserRole } from '../user.entity'

export class UpdateRoleDto {
  @IsEnum(UserRole)
  role: UserRole
}