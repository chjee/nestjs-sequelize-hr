import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const employee =
      await this.employeeRepository.create<Employee>(createEmployeeDto);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    const employees = await this.employeeRepository.findAll<Employee>({
      include: [Employee, Job, Department],
    });
    if (!employees) {
      throw new HttpException('No employees found', HttpStatus.NOT_FOUND);
    }
    return employees;
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne<Employee>({
      include: [Employee, Job, Department],
      where: { employee_id: id },
    });
    if (!employee) {
      throw new HttpException('No employee found', HttpStatus.NOT_FOUND);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.employeeRepository.update(updateEmployeeDto, {
      where: { employee_id: id },
    });
  }

  async remove(id: number) {
    return await this.employeeRepository.destroy({
      where: { employee_id: id },
    });
  }
}
