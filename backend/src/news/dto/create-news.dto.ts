import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateNewsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  title: string

  @IsString()
  @IsNotEmpty()
  summary: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  imageUrl?: string
}
