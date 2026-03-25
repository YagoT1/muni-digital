import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import type { Request } from 'express'
import { Areas } from '../auth/decorators/areas.decorator'
import { Roles } from '../auth/decorators/roles.decorator'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { AreasGuard } from '../auth/guards/areas.guard'
import { UserArea, UserRole } from '../users/user.entity'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { NewsService } from './news.service'

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll() {
    const data = await this.newsService.findAll()
    return {
      data,
      message: 'Noticias públicas obtenidas correctamente',
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.newsService.findOne(id)
    return {
      data,
      message: 'Noticia obtenida correctamente',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/preview')
  async preview(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const data = await this.newsService.findOnePreview(id, req.user as never)
    return {
      data,
      message: 'Vista previa de noticia obtenida correctamente',
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard, AreasGuard)
  @Roles(UserRole.ADMIN, UserRole.EMPLEADO)
  @Areas(UserArea.ADMIN, UserArea.PRENSA)
  @Post()
  async create(@Body() dto: CreateNewsDto, @Req() req: Request) {
    const data = await this.newsService.create(dto, req.user as never)
    return {
      data,
      message: 'Noticia creada correctamente',
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateNewsDto,
    @Req() req: Request,
  ) {
    const data = await this.newsService.update(id, dto, req.user as never)
    return {
      data,
      message: 'Noticia actualizada correctamente',
    }
  }
}
