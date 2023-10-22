import { Inject, Injectable } from '@nestjs/common';
import { Department } from './entities/department.entity';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @Inject('DEPARTMENT_REPOSITORY')
    private readonly departmentRepository: typeof Department,
  ) {}
  create(createDepartmentDto: CreateDepartmentDto) {
    return this.departmentRepository.create<Department>(createDepartmentDto);
  }

  findAll(): Promise<Department[]> {
    return this.departmentRepository.findAll<Department>();
  }

  findOne(id: number): Promise<Department> {
    return this.departmentRepository.findOne({
      where: { department_id: id },
    });
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return this.departmentRepository.update(updateDepartmentDto, {
      where: { department_id: id },
    });
  }

  remove(id: number) {
    return this.departmentRepository.destroy({
      where: { department_id: id },
    });
  }
}
