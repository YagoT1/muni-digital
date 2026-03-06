import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const isProd = config.get('NODE_ENV') === 'production'
    
        return {
          type: 'postgres',
          host: config.get('DB_HOST'),
          port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
          username: config.get('DB_USER'),
          password: config.get('DB_PASS'),
          database: config.get('DB_NAME'),
          autoLoadEntities: true,
    
          // ✅ DEV: synchronize true (solo si reseteás bien)
          // ✅ PROD: synchronize false (usar migraciones)
          synchronize: !isProd,
    
          // opcional pero útil en DEV
          logging: !isProd,
        }
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
