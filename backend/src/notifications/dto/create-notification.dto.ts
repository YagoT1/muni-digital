import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(5, 500)
  message: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean
}
