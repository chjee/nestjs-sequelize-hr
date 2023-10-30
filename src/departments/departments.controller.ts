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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('department')
@ApiTags('Department API')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @ApiBearerAuth('access_token')
  @Post()
  @ApiOperation({
    summary: 'Department Create API',
    description: 'Create a department',
  })
  @ApiBody({ type: CreateDepartmentDto })
  @ApiOkResponse({
    schema: {
      example: {
        department_id: 11,
        department_name: 'Holding',
        manager_id: 200,
        location_id: 1700,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Body() createDepartmentDto: CreateDepartmentDto,
  ): Promise<Department> {
    return this.departmentsService.create(createDepartmentDto);
  }

  @ApiBearerAuth('access_token')
  @Get()
  @ApiOperation({
    summary: 'Department List API',
    description: 'Get all departments',
  })
  @ApiOkResponse({ type: [CreateDepartmentDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(): Promise<Department[]> {
    return this.departmentsService.findAll();
  }

  @ApiBearerAuth('access_token')
  @Get(':id')
  @ApiOperation({
    summary: 'Department Find API',
    description: 'Find a department by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Department ID',
    example: 10,
  })
  @ApiOkResponse({ type: CreateDepartmentDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<Department> {
    return this.departmentsService.findOne(+id);
  }

  @ApiBearerAuth('access_token')
  @Patch(':id')
  @ApiOperation({
    summary: 'Department Update API',
    description: 'Update a department by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Department ID',
    example: 11,
  })
  @ApiBody({
    schema: {
      type: 'object',
      example: {
        department_name: 'Holding #2',
        manager_id: 200,
        location_id: 1700,
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ): Promise<any> {
    return this.departmentsService.update(+id, updateDepartmentDto);
  }

  @ApiBearerAuth('access_token')
  @Delete(':id')
  @ApiOperation({
    summary: 'Department Delete API',
    description: 'Delete a department by id',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Department ID',
    example: 11,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async remove(@Param('id', new ParseIntPipe()) id: number): Promise<any> {
    return this.departmentsService.remove(+id);
  }
}
