import { Employee } from './entities/employee.entity';

export const employeesProviders = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
];
