import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

type WindowConfig = { limit: number; windowMs: number }

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly hits = new Map<string, number[]>()

  private readonly globalConfig: WindowConfig = { limit: 120, windowMs: 60_000 }
  private readonly loginConfig: WindowConfig = { limit: 5, windowMs: 60_000 }
  private readonly registerConfig: WindowConfig = { limit: 10, windowMs: 60_000 }
  private readonly resetPasswordConfig: WindowConfig = { limit: 5, windowMs: 60_000 }

  use(req: Request, res: Response, next: NextFunction) {
    const cfg = this.pickConfig(req.path)
    this.consume(req, cfg)
    next()
  }

  private pickConfig(path: string): WindowConfig {
    if (path === '/auth/login') return this.loginConfig
    if (path === '/auth/register') return this.registerConfig
    if (path.match(/^\/users\/\d+\/reset-password$/)) return this.resetPasswordConfig
    return this.globalConfig
  }

  private consume(req: Request, cfg: WindowConfig) {
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const key = `${ip}:${req.path}`
    const now = Date.now()
    const windowStart = now - cfg.windowMs

    const previous = this.hits.get(key) ?? []
    const current = previous.filter((ts) => ts > windowStart)

    if (current.length >= cfg.limit) {
      throw new HttpException('Too many requests, please try again later', HttpStatus.TOO_MANY_REQUESTS)
    }

    current.push(now)
    this.hits.set(key, current)
  }
}
