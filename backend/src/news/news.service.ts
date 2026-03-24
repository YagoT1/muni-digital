import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
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

  private canCreate(user: RequestUser) {
    if (this.isAdmin(user)) return true
    return user.role === UserRole.EMPLEADO && this.isPrensa(user)
  }

  private canPublish(user: RequestUser) {
    return this.isAdmin(user) || this.isPrensa(user)
  }

  async create(dto: CreateNewsDto, user: RequestUser): Promise<News> {
    if (!this.canCreate(user)) {
      throw new ForbiddenException('No tenés permisos para crear noticias')
    }

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
      if (!this.canPublish(user)) {
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

  async findOne(id: number, user?: RequestUser): Promise<News> {
    const news = await this.newsRepo.findOne({ where: { id } })
    if (!news) throw new NotFoundException('Noticia no encontrada')

    if (news.isPublished) return news

    const isAuthor = user && news.authorId === user.id
    if (isAuthor || (user && this.isAdmin(user))) return news

    throw new NotFoundException('Noticia no encontrada')
  }
}
