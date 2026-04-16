import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';

const mockEmployee = {
  employee_id: 207,
  first_name: 'Steven',
  last_name: 'King',
  email: 'nobody@gmail.com',
  hire_date: '2003-06-17',
  job_id: 'IT_PROG',
  salary: 24000,
} as unknown as Employee;

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('EmployeesService', () => {
  let service: EmployeesService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeesService,
        { provide: 'EMPLOYEE_REPOSITORY', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('존재하는 id → Employee 반환', async () => {
      mockRepository.findOne.mockResolvedValue(mockEmployee);
      const result = await service.findOne(207);
      expect(result).toEqual(mockEmployee);
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('존재하는 id → 수정 후 Employee 반환', async () => {
      mockRepository.update.mockResolvedValue([1]);
      mockRepository.findOne.mockResolvedValue(mockEmployee);
      const result = await service.update(207, { salary: 30000 });
      expect(result).toEqual(mockEmployee);
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.update.mockResolvedValue([0]);
      await expect(service.update(999, { salary: 30000 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('존재하는 id → void 반환', async () => {
      mockRepository.destroy.mockResolvedValue(1);
      await expect(service.remove(207)).resolves.toBeUndefined();
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.destroy.mockResolvedValue(0);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
