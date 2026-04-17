import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      return await this.employeeRepository.create<Employee>(createEmployeeDto);
    } catch (error) {
      if (error instanceof Error && error.name === 'SequelizeForeignKeyConstraintError') {
        throw new BadRequestException('Invalid job_id, manager_id, or department_id');
      }
      throw error;
    }
  }

  async findAll(page = 1, limit = 20): Promise<{ data: Employee[]; total: number }> {
    const { rows, count } = await this.employeeRepository.findAndCountAll({
      limit,
      offset: (page - 1) * limit,
      include: [Job, Department],
    });
    return { data: rows, total: count };
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne<Employee>({
      include: [Employee, Job, Department],
      where: { employee_id: id },
    });
    if (!employee) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const [affectedCount] = await this.employeeRepository.update(
      updateEmployeeDto,
      { where: { employee_id: id } },
    );
    if (affectedCount === 0) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const deletedCount = await this.employeeRepository.destroy({
      where: { employee_id: id },
    });
    if (deletedCount === 0) {
      throw new NotFoundException(`Employee #${id} not found`);
    }
  }
}
