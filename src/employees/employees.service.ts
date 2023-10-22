import { Inject, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly employeeRepository: typeof Employee,
  ) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.create<Employee>(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.findAll<Employee>();
  }

  findOne(id: number) {
    return this.employeeRepository.findOne({
      where: { employee_id: id },
    });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeRepository.update(updateEmployeeDto, {
      where: { employee_id: id },
    });
  }

  remove(id: number) {
    return this.employeeRepository.destroy({
      where: { employee_id: id },
    });
  }
}
