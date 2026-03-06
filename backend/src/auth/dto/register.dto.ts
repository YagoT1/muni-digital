import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsDateString,
  ValidateIf,
} from 'class-validator';
import { Gender, DocumentType } from '../../users/user.entity';

export class RegisterDto {
  // Obligatorios
  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  lastName: string;

  @IsDateString({}, { message: 'birthDate must be ISO date (YYYY-MM-DD)' })
  birthDate: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 72, { message: 'password must be 8-72 chars' })
  password: string;

  // Ubicación (requeridos)
  @IsString()
  @IsNotEmpty()
  @Length(2, 80)
  country: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 80)
  province: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 80)
  city: string;

  /**
   * Reglas:
   * - Si country === 'AR' => dni requerido (7-8 dígitos)
   * - Si country !== 'AR' => documentType + documentNumber requeridos
   */

  @ValidateIf((o) => (o.country ?? '').toUpperCase() === 'AR')
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{7,8}$/, { message: 'dni must be 7-8 digits (Argentina)' })
  dni?: string;

  @ValidateIf((o) => (o.country ?? '').toUpperCase() !== 'AR')
  @IsEnum(DocumentType, { message: 'documentType is required for non-AR users' })
  documentType?: DocumentType;

  @ValidateIf((o) => (o.country ?? '').toUpperCase() !== 'AR')
  @IsString()
  @IsNotEmpty()
  @Length(3, 40)
  // Permite letras/números y separadores típicos (ajustable)
  @Matches(/^[A-Za-z0-9\-_.]{3,40}$/, { message: 'documentNumber invalid format' })
  documentNumber?: string;

  // Opcionales estratégicos
  @IsOptional()
  @IsString()
  @Matches(/^\+?[0-9]{8,15}$/, { message: 'phone invalid format' })
  phone?: string;

  @IsOptional()
  @IsString()
  @Length(3, 120)
  addressLine1?: string;

  @IsOptional()
  @IsString()
  @Length(0, 120)
  addressLine2?: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  postalCode?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'cuil must be 11 digits' })
  cuil?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}