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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Controller('employee')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Employee> {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<any> {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  async emove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.employeesService.remove(+id);
  }
}
