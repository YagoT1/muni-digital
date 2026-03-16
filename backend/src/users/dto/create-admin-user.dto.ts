import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator'
import { DocumentType, Gender, UserRole } from '../user.entity'

export class CreateAdminUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 100)
  firstName?: string

  @IsOptional()
  @IsString()
  @Length(2, 100)
  lastName?: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{7,8}$/)
  dni?: string

  @IsDateString()
  birthDate: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(8, 72)
  password: string

  @IsString()
  @Length(2, 80)
  country: string

  @IsString()
  @Length(2, 80)
  province: string

  @IsString()
  @Length(2, 80)
  city: string

  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{8,15}$/)
  phone?: string

  @IsOptional()
  @IsString()
  @Length(0, 120)
  addressLine1?: string

  @IsOptional()
  @IsString()
  @Length(0, 120)
  addressLine2?: string

  @IsOptional()
  @IsString()
  @Length(0, 20)
  postalCode?: string

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/)
  cuil?: string

  @IsOptional()
  @IsEnum(DocumentType)
  documentType?: DocumentType

  @IsOptional()
  @IsString()
  @Length(3, 40)
  documentNumber?: string

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole

  @ValidateIf((o: CreateAdminUserDto) => o.role === UserRole.EMPLEADO)
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  legajo?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean
}
