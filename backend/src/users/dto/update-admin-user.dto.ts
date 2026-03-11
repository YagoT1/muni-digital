import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  Matches,
  ValidateIf,
} from 'class-validator'
import { DocumentType, Gender, UserRole } from '../user.entity'

export class UpdateAdminUserDto {
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

  @IsOptional()
  @IsDateString()
  birthDate?: string

  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  @Length(8, 72)
  password?: string

  @IsOptional()
  @IsString()
  @Length(2, 80)
  country?: string

  @IsOptional()
  @IsString()
  @Length(2, 80)
  province?: string

  @IsOptional()
  @IsString()
  @Length(2, 80)
  city?: string

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

  @ValidateIf((o: UpdateAdminUserDto) => o.role === UserRole.EMPLEADO)
  @IsString()
  @Length(1, 50)
  legajo?: string

  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean
}
