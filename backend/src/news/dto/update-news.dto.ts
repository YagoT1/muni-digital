import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator'

export class UpdateNewsDto {
  @IsOptional()
  @IsString()
  @MaxLength(180)
  title?: string

  @IsOptional()
  @IsString()
  summary?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean
}
