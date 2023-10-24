import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    const department =
      await this.departmentRepository.create<Department>(createDepartmentDto);
    return department;
  }

  async findAll(): Promise<Department[]> {
    const departments = await this.departmentRepository.findAll<Department>({
      include: [Employee, Location],
    });
    if (!departments) {
      throw new HttpException('No departments found', HttpStatus.NOT_FOUND);
    }
    return departments;
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne<Department>({
      include: [Employee, Location],
      where: { department_id: id },
    });
    if (!department) {
      throw new HttpException('No department found', HttpStatus.NOT_FOUND);
    }
    return department;
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return await this.departmentRepository.update(updateDepartmentDto, {
      where: { department_id: id },
    });
  }

  async remove(id: number) {
    return await this.departmentRepository.destroy({
      where: { department_id: id },
    });
  }
}
