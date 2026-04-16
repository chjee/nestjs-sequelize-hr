import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Employee } from '../employees/entities/employee.entity';
import { Location } from './entities/location.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private readonly departmentRepository: typeof Department,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    return this.departmentRepository.create<Department>(createDepartmentDto);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.findAll<Department>({
      include: [Employee, Location],
    });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne<Department>({
      include: [Employee, Location],
      where: { department_id: id },
    });
    if (!department) {
      throw new NotFoundException(`Department #${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto): Promise<Department> {
    const [affectedCount] = await this.departmentRepository.update(
      updateDepartmentDto,
      { where: { department_id: id } },
    );
    if (affectedCount === 0) {
      throw new NotFoundException(`Department #${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.departmentRepository.destroy({
      where: { department_id: id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`Department #${id} not found`);
    }
  }
}
