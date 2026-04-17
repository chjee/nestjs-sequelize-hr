import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.dev', '.env'],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().min(32).required(),
        DB_HOST: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().allow('').required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number().default(3000),
        ALLOWED_ORIGINS: Joi.string().optional(),
      }),
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ ttl: 60000, limit: 10 }],
    }),
    UsersModule,
    AuthModule,
    DepartmentsModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [{ provide: 'APP_GUARD', useClass: AuthGuard }],
})
export class AppModule {}
