import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { AuditModule } from './audit/audit.module';
import { AuditInterceptor } from './common/interceptors/audit.interceptor';
import { RequestIdMiddleware } from './common/middleware/request-id.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.local', '.env'],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().min(32).required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_POOL_MAX: Joi.number().default(5),
        DB_POOL_MIN: Joi.number().default(0),
        DB_LOGGING: Joi.boolean().default(false),
        DB_SYNC: Joi.boolean().default(false),
        DB_MIGRATE: Joi.boolean().default(true),
        LISTEN_PORT: Joi.number().default(3000),
        ALLOWED_ORIGINS: Joi.string().optional(),
        REFRESH_TOKEN_TTL_DAYS: Joi.number().default(7),
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    DatabaseModule,
    HealthModule,
    AuditModule,
    UsersModule,
    AuthModule,
    DepartmentsModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: AuditInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
