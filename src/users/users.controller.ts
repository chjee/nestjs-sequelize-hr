import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users API')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('access_token')
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'User Create API', description: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: CreateUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('access_token')
  @Get()
  @ApiOperation({ summary: 'User List API', description: 'Get all users (paginated)' })
  @ApiOkResponse({ schema: { example: { data: [], total: 0 } } })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Query() paginationDto: PaginationDto): Promise<{ data: User[]; total: number }> {
    const { page, limit } = paginationDto;
    return this.usersService.findAll(page, limit);
  }

  @ApiBearerAuth('access_token')
  @Get(':id')
  @ApiOperation({ summary: 'User Find API', description: 'Find a user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ type: CreateUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @ApiBearerAuth('access_token')
  @Patch(':id')
  @ApiOperation({ summary: 'User Update API', description: 'Update a user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth('access_token')
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'User Delete API', description: 'Delete a user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiNoContentResponse({ description: 'Deleted successfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
