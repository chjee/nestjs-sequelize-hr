import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Controller('department')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  async findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Department> {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<any> {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.departmentsService.remove(+id);
  }
}
