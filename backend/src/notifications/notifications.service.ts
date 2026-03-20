import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Notification } from './notification.entity'
import { CreateNotificationDto } from './dto/create-notification.dto'
import { UpdateNotificationDto } from './dto/update-notification.dto'

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationsRepo: Repository<Notification>,
  ) {}

  findActive() {
    return this.notificationsRepo.find({
      where: { isActive: true },
      order: { createdAt: 'DESC' },
    })
  }

  findAll() {
    return this.notificationsRepo.find({
      order: { createdAt: 'DESC' },
    })
  }

  async create(dto: CreateNotificationDto) {
    const entity = this.notificationsRepo.create({
      title: dto.title.trim(),
      message: dto.message.trim(),
      isActive: dto.isActive ?? true,
    })

    return this.notificationsRepo.save(entity)
  }

  async update(id: number, dto: UpdateNotificationDto) {
    const entity = await this.notificationsRepo.findOne({ where: { id } })
    if (!entity) throw new NotFoundException('Notification not found')

    if (dto.title !== undefined) entity.title = dto.title.trim()
    if (dto.message !== undefined) entity.message = dto.message.trim()
    if (dto.isActive !== undefined) entity.isActive = dto.isActive

    return this.notificationsRepo.save(entity)
  }
}
