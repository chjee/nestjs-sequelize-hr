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
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('department')
@ApiTags('Department API')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOperation({
    summary: 'Department Create API',
    description: 'Create a department',
  })
  @ApiBody({ type: CreateDepartmentDto })
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Department List API',
    description: 'Get all departments',
  })
  async findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Department Find API',
    description: 'Find a department by id',
  })
  @ApiParam({ name: 'id', type: Number })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Department> {
    return this.departmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Department Update API',
    description: 'Update a department by id',
  })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<any> {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Department Delete API',
    description: 'Delete a department by id',
  })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.departmentsService.remove(+id);
  }
}
