import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateNewsDto } from './dto/create-news.dto'
import { UpdateNewsDto } from './dto/update-news.dto'
import { News } from './news.entity'
import { User, UserArea, UserRole } from '../users/user.entity'

type RequestUser = Pick<User, 'id' | 'role' | 'area'>

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly newsRepo: Repository<News>,
  ) {}

  private isAdmin(user: RequestUser) {
    return user.role === UserRole.ADMIN
  }

  private isPrensa(user: RequestUser) {
    return user.area === UserArea.PRENSA
  }

  async create(dto: CreateNewsDto, user: RequestUser): Promise<News> {
    const news = this.newsRepo.create({
      title: dto.title,
      summary: dto.summary,
      content: dto.content,
      imageUrl: dto.imageUrl ?? null,
      authorId: user.id,
      area: UserArea.PRENSA,
      isPublished: false,
    })

    return this.newsRepo.save(news)
  }

  async update(id: number, dto: UpdateNewsDto, user: RequestUser): Promise<News> {
    const news = await this.newsRepo.findOne({ where: { id } })
    if (!news) throw new NotFoundException('Noticia no encontrada')

    const isAuthor = news.authorId === user.id
    if (!isAuthor && !this.isAdmin(user)) {
      throw new ForbiddenException('No podés editar esta noticia')
    }

    if (dto.isPublished !== undefined && dto.isPublished !== news.isPublished) {
      if (!this.isAdmin(user) && !this.isPrensa(user)) {
        throw new ForbiddenException('No tenés permisos para publicar noticias')
      }
      news.isPublished = dto.isPublished
    }

    if (dto.title !== undefined) news.title = dto.title
    if (dto.summary !== undefined) news.summary = dto.summary
    if (dto.content !== undefined) news.content = dto.content
    if (dto.imageUrl !== undefined) news.imageUrl = dto.imageUrl

    return this.newsRepo.save(news)
  }

  async findAll(): Promise<News[]> {
    return this.newsRepo.find({
      where: { isPublished: true },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number): Promise<News> {
    const news = await this.newsRepo.findOne({ where: { id, isPublished: true } })
    if (!news) throw new NotFoundException('Noticia no encontrada')
    return news
  }

  async findOnePreview(id: number, user: RequestUser): Promise<News> {
    const news = await this.newsRepo.findOne({ where: { id } })
    if (!news) throw new NotFoundException('Noticia no encontrada')

    if (news.isPublished) return news

    const isAuthor = news.authorId === user.id
    if (isAuthor || this.isAdmin(user)) return news

    throw new ForbiddenException('No tenés permisos para ver esta noticia')
  }
}
