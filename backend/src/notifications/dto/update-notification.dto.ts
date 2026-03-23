import { IsBoolean, IsOptional, IsString, Length } from 'class-validator'

export class UpdateNotificationDto {
  @IsOptional()
  @IsString()
  @Length(3, 120)
  title?: string

  @IsOptional()
  @IsString()
  @Length(5, 500)
  message?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
