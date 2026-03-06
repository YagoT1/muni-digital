// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User, UserRole } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const bcrypt = await import('bcrypt');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return user;
  }

  private buildTokenPayload(user: User) {
    return {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    const payload = this.buildTokenPayload(user);

    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Ya existe un usuario con ese email');
    }

    const bcrypt = await import('bcrypt');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      birthDate: new Date(dto.birthDate),
      email: this.usersService.normalizeEmail(dto.email),
      password: hashed,
      country: dto.country,
      province: dto.province,
      city: dto.city,
      dni: dto.dni ?? null,
      documentType: dto.documentType ?? null,
      documentNumber: dto.documentNumber ?? null,
      phone: dto.phone ?? null,
      addressLine1: dto.addressLine1 ?? null,
      addressLine2: dto.addressLine2 ?? null,
      postalCode: dto.postalCode ?? null,
      cuil: dto.cuil ?? null,
      gender: dto.gender ?? null,
      role: UserRole.CIUDADANO,
      isActive: true,
      isVerified: false,
    });

    const payload = this.buildTokenPayload(user);
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}