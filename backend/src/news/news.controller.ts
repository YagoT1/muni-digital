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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
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
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const data = await this.newsService.findOne(id, req.user as never)
    return {
      data,
      message: 'Noticia obtenida correctamente',
    }
  }

  @UseGuards(JwtAuthGuard)
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
