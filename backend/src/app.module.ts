import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { ClaimsModule } from './claims/claims.module'
import { SecurityHeadersMiddleware } from './security/security-headers.middleware'
import { RateLimitMiddleware } from './security/rate-limit.middleware'

type EnvVars = {
  NODE_ENV?: string
  JWT_SECRET?: string
  DATABASE_URL?: string
  CORS_ORIGINS?: string
  DB_HOST?: string
  DB_PORT?: string
  DB_USER?: string
  DB_PASS?: string
  DB_NAME?: string
}

function validateEnv(env: EnvVars) {
  const nodeEnv = env.NODE_ENV ?? 'development'
  const isProd = nodeEnv === 'production'

  const requiredAlways = ['JWT_SECRET'] as const
  for (const key of requiredAlways) {
    if (!env[key]) throw new Error(`${key} is required`)
  }

  if (isProd) {
    const requiredProd = ['NODE_ENV', 'DATABASE_URL', 'CORS_ORIGINS'] as const
    for (const key of requiredProd) {
      if (!env[key]) throw new Error(`${key} is required in production`)
    }
  }

  return env
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: validateEnv,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'production'
        const databaseUrl = config.get<string>('DATABASE_URL')

        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: !isProd,
            logging: !isProd,
            ssl: isProd ? { rejectUnauthorized: false } : false,
          }
        }

        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
          username: config.get('DB_USER'),
          password: config.get('DB_PASS'),
          database: config.get('DB_NAME'),
          autoLoadEntities: true,
          synchronize: !isProd,
          logging: !isProd,
        }
      },
    }),
    UsersModule,
    AuthModule,
    ClaimsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityHeadersMiddleware, RateLimitMiddleware).forRoutes('*')
  }
}
