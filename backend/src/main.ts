import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe, Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { seedAdmin } from './seed/seed-admin'
import cookieParser from 'cookie-parser'
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter'

function getCorsOrigins() {
  return (process.env.CORS_ORIGINS ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
}

function shouldRunSeedAdmin() {
  const value = (process.env.SEED_ADMIN_ON_BOOT ?? '').trim().toLowerCase()
  return value === 'true'
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
  app.use(cookieParser())

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(new AllExceptionsFilter())

  if (shouldRunSeedAdmin()) {
    try {
      const dataSource = app.get(DataSource)
      await seedAdmin(dataSource)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknown error'
      logger.warn(`[seedAdmin] failed: ${message}`)
    }
  } else {
    logger.log('[seedAdmin] skipped (set SEED_ADMIN_ON_BOOT=true to enable)')
  }

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
