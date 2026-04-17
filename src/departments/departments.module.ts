import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { departmentsProviders } from './departments.providers';

@Module({
  controllers: [DepartmentsController],
  providers: [DepartmentsService, ...departmentsProviders],
})
export class DepartmentsModule {}
