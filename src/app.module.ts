import { Module } from '@nestjs/common';
import { DepartmentsModule } from './departments/departments.module';
import { EmployeesModule } from './employees/employees.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env.dev', '.env'],
    }),
    DepartmentsModule,
    EmployeesModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
