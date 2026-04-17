import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { employeesProviders } from './employees.providers';

@Module({
  controllers: [EmployeesController],
  providers: [EmployeesService, ...employeesProviders],
})
export class EmployeesModule {}
