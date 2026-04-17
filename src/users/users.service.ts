import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: typeof User,
  ) {}

  async findOne(userid: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { userid } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { userid: createUserDto.userid },
    });
    if (existing) {
      throw new ConflictException(`User '${createUserDto.userid}' already exists`);
    }
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.create({
      ...createUserDto,
      password: hashed,
    } as User);
    const { password: _, ...result } = user.toJSON() as User & { password: string };
    return result as User;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Partial<User> = { ...updateUserDto } as Partial<User>;
    if (updateUserDto.password) {
      data.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    const [affectedCount] = await this.userRepository.update(data, {
      where: { id },
    });
    if (affectedCount === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.userRepository.destroy({ where: { id } });
    if (deletedCount === 0) {
      throw new NotFoundException(`User #${id} not found`);
    }
  }
}
