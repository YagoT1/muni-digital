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
import { UserRole } from '../users/user.entity'
import { NotificationsService } from './notifications.service'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('active')
  active() {
    return this.notificationsService.findActive()
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  list() {
    return this.notificationsService.findAll()
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNotificationDto,
  ) {
    return this.notificationsService.update(id, dto)
  }
}
