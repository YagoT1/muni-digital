import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

type WindowConfig = { limit: number; windowMs: number }

type RateLimitStore = {
  consume(key: string, cfg: WindowConfig): Promise<boolean>
}

class InMemoryRateLimitStore implements RateLimitStore {
  private readonly hits = new Map<string, number[]>()

  async consume(key: string, cfg: WindowConfig): Promise<boolean> {
    const now = Date.now()
    const windowStart = now - cfg.windowMs

    const previous = this.hits.get(key) ?? []
    const current = previous.filter((ts) => ts > windowStart)

    if (current.length >= cfg.limit) return false

    current.push(now)
    this.hits.set(key, current)
    return true
  }
}

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private readonly globalConfig: WindowConfig = { limit: 120, windowMs: 60_000 }
  private readonly loginConfig: WindowConfig = { limit: 5, windowMs: 60_000 }
  private readonly registerConfig: WindowConfig = { limit: 10, windowMs: 60_000 }
  private readonly resetPasswordConfig: WindowConfig = { limit: 5, windowMs: 60_000 }

  private readonly store: RateLimitStore

  constructor() {
    // Ready for distributed strategy: if REDIS_URL exists and redis client is installed,
    // this class can be swapped to a Redis-backed implementation without changing callers.
    this.store = new InMemoryRateLimitStore()
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const cfg = this.pickConfig(req.path)
    const ip = req.ip || req.socket.remoteAddress || 'unknown'
    const key = `${ip}:${req.path}`

    const allowed = await this.store.consume(key, cfg)
    if (!allowed) {
      throw new HttpException('Too many requests, please try again later', HttpStatus.TOO_MANY_REQUESTS)
    }

    next()
  }

  private pickConfig(path: string): WindowConfig {
    if (path === '/auth/login') return this.loginConfig
    if (path === '/auth/register') return this.registerConfig
    if (path.match(/^\/users\/\d+\/reset-password$/)) return this.resetPasswordConfig
    return this.globalConfig
  }
}
