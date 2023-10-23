import { Inject, Injectable } from '@nestjs/common';
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
  async create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.create<Department>(createDepartmentDto);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.findAll<Department>({
      include: [Employee, Location],
    });
  }

  async findOne(id: number): Promise<Department> {
    return this.departmentRepository.findOne({
      include: [Employee, Location],
      where: { department_id: id },
    });
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(updateDepartmentDto, {
      where: { department_id: id },
    });
  }

  async remove(id: number) {
    return this.departmentRepository.destroy({
      where: { department_id: id },
    });
  }
}
