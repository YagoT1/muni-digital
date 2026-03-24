import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from '../users/user.entity'

@Entity({ name: 'news' })
export class News {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', length: 180 })
  title: string

  @Column({ type: 'text' })
  summary: string

  @Column({ type: 'text' })
  content: string

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl?: string | null

  @Column({ type: 'boolean', default: false })
  isPublished: boolean

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date

  @ManyToOne(() => User, { eager: true })
  author: User

  @Column()
  authorId: number

  @Column({ type: 'varchar', length: 30 })
  area: string
}
