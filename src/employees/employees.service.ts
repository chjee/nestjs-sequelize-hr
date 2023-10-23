import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
import { Job } from './entities/job.entity';
import { Department } from '../departments/entities/department.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: typeof Employee,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.create<Employee>(createEmployeeDto);
  }

  async findAll() {
    return this.employeeRepository.findAll<Employee>({
      include: [Employee, Job, Department],
    });
  }

  async findOne(id: number) {
    return this.employeeRepository.findOne({
      include: [Employee, Job, Department],
      where: { employee_id: id },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(updateEmployeeDto, {
      where: { employee_id: id },
    });
  }

  async remove(id: number) {
    return this.employeeRepository.destroy({
      where: { employee_id: id },
    });
  }
}
