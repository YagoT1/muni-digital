import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateClaimDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @IsNotEmpty()
  contact: string;

  @IsOptional()
  @IsString()
  location?: string;
}
