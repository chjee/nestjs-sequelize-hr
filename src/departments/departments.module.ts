import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { DatabaseModule } from '../database/database.module';
import { departmentsProviders } from './departments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, ...departmentsProviders],
})
export class DepartmentsModule {}
