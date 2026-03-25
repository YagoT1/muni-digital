import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AREAS_KEY } from '../decorators/areas.decorator'

@Injectable()
export class AreasGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAreas = this.reflector.getAllAndOverride<string[]>(AREAS_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredAreas || requiredAreas.length === 0) return true

    const req = context.switchToHttp().getRequest()
    const user = req.user
    if (!user?.area) return false

    return requiredAreas.includes(user.area)
  }
}
