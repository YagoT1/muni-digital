// src/users/users.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { UserRole } from './user.entity'
import { UsersService } from './users.service'
import { UpdateRoleDto } from './dto/update-role.dto'
import { UpdateActiveDto } from './dto/update-active.dto'

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async list() {
    return this.usersService.findAllSafe()
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findById(id)
    return this.usersService.toSafe(user)
  }

  @Patch(':id/role')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRoleDto,
  ) {
    return this.usersService.setRole(id, dto.role)
  }

  @Patch(':id/active')
  async updateActive(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateActiveDto,
  ) {
    return this.usersService.setActive(id, dto.isActive)
  }

  @Post(':id/reset-password')
  async resetPassword(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.resetPassword(id)
  }
}