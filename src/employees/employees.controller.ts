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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('employee')
@ApiTags('Employee API')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @ApiBearerAuth('access_token')
  @Post()
  @ApiOperation({
    summary: 'Employee Create API',
    description: 'Create a employee',
  })
  @ApiBody({ type: CreateEmployeeDto })
  @ApiOkResponse({
    schema: {
      example: {
        employee_id: 207,
        first_name: 'Steven',
        last_name: 'King',
        email: 'nobody@gmail.com',
        phone_number: '515.123.4567',
        hire_date: '2003-06-17T00:00:00.000Z',
        job_id: 'IT_PROG',
        salary: 24000,
        commission_pct: 0.2,
        manager_id: 103,
        department_id: 60,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeesService.create(createEmployeeDto);
  }

  @ApiBearerAuth('access_token')
  @Get()
  @ApiOperation({
    summary: 'Employee List API',
    description: 'Get all employees',
  })
  @ApiOkResponse({ type: [CreateEmployeeDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(): Promise<Employee[]> {
    return this.employeesService.findAll();
  }

  @ApiBearerAuth('access_token')
  @Get(':id')
  @ApiOperation({
    summary: 'Employee Find API',
    description: 'Find a employee by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Employee ID',
    example: 207,
  })
  @ApiOkResponse({ type: CreateEmployeeDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Employee> {
    return this.employeesService.findOne(+id);
  }

  @ApiBearerAuth('access_token')
  @Patch(':id')
  @ApiOperation({
    summary: 'Employee Update API',
    description: 'Update a employee by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Employee ID',
    example: 207,
  })
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        first_name: 'Steven',
        last_name: 'King',
        email: 'anybody@gmail.com',
        phone_number: '515.123.4567',
        hire_date: '2006-06-17',
        job_id: 'IT_PROG',
        salary: 24000,
        commission_pct: 0.2,
        manager_id: 103,
        department_id: 60,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<any> {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @ApiBearerAuth('access_token')
  @Delete(':id')
  @ApiOperation({
    summary: 'Employee Remove API',
    description: 'Remove a employee by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Employee ID',
    example: 207,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async emove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.employeesService.remove(+id);
  }
}
