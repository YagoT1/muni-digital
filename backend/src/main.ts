import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { seedAdmin } from './seed/seed-admin'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ✅ CORS para frontend Vite (5173)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
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

  // Seed admin (solo si no existe)
  try {
    const dataSource = app.get(DataSource)
    await seedAdmin(dataSource)
  } catch (e) {
    console.log('[seedAdmin] Error (no bloqueante):', (e as any)?.message ?? e)
  }

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()