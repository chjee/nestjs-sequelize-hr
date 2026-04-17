import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
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
  @ApiOperation({ summary: 'User Create API', description: 'Create a user' })
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse({ type: CreateUserDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('access_token')
  @Get()
  @ApiOperation({ summary: 'User List API', description: 'Get all users' })
  @ApiOkResponse({ type: [CreateUserDto] })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
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
  @ApiOperation({ summary: 'User Delete API', description: 'Delete a user by id' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
