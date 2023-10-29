import { Department } from './entities/department.entity';

export const departmentsProviders = [
  {
    provide: 'DEPARTMENT_REPOSITORY',
    useValue: Department,
  },
];
