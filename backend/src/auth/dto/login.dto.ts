import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 72, { message: 'La contraseña debe contener al menos 8 caracteres.' })
  password: string;
}