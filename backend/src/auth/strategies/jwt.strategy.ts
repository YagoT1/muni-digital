import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from '../../users/users.service'
import { UserRole } from '../../users/user.entity'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const secret = configService.get<string>('JWT_SECRET')
    if (!secret) throw new Error('JWT_SECRET is not set')

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    })
  }

  async validate(payload: { sub?: number }) {
    const userId = payload?.sub
    if (!userId) throw new UnauthorizedException('Invalid token payload')

    const user = await this.usersService.findById(Number(userId))
    if (!user) throw new UnauthorizedException('User not found')
    if (user.isActive === false) throw new UnauthorizedException('User is inactive')

    const base = {
      dni: user.dni,
      email: user.email,
      role: user.role,
      legajo: user.legajo ?? null,
      isActive: user.isActive,
    }

    // Regla: solo admin visualiza ID en /auth/me
    if (user.role === UserRole.ADMIN) {
      return { id: user.id, ...base }
    }

    return base
  }
}
