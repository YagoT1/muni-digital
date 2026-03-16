import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { seedAdmin } from './seed/seed-admin'

function getCorsOrigins() {
  return (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function shouldRunSeedAdmin() {
  const value = (process.env.SEED_ADMIN_ON_BOOT ?? '').trim().toLowerCase()
  if (value === 'true') return true
  if (value === 'false') return false

  return process.env.NODE_ENV !== 'production'
}

async function bootstrap() {
  const logger = new Logger('Bootstrap')
  const app = await NestFactory.create(AppModule)

  app.getHttpAdapter().getInstance().set('trust proxy', 1)

  const origins = getCorsOrigins()
  if (origins.length === 0 && process.env.NODE_ENV !== 'production') {
    logger.warn('CORS_ORIGINS is empty. No cross-origin browser requests will be allowed.')
  }

  app.enableCors({
    origin: origins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  if (shouldRunSeedAdmin()) {
    try {
      const dataSource = app.get(DataSource)
      await seedAdmin(dataSource)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error'
      logger.warn(`[seedAdmin] failed: ${message}`)
    }
  } else {
    logger.log('[seedAdmin] skipped (SEED_ADMIN_ON_BOOT=false)')
  }

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
