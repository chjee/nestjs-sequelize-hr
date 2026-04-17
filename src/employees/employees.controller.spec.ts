import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

const mockEmployee = {
  employee_id: 207,
  first_name: 'Steven',
  last_name: 'King',
  email: 'sking@gmail.com',
  phone_number: '515.123.4567',
  hire_date: '2003-06-17',
  job_id: 'IT_PROG',
  salary: 24000,
  commission_pct: 0.2,
  manager_id: 103,
  department_id: 60,
};

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('EmployeesController', () => {
  let controller: EmployeesController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [{ provide: EmployeesService, useValue: mockService }],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('직원 생성 → 생성된 직원 반환', async () => {
      mockService.create.mockResolvedValue(mockEmployee);
      const result = await controller.create(mockEmployee as any);
      expect(result).toEqual(mockEmployee);
      expect(mockService.create).toHaveBeenCalledWith(mockEmployee);
    });
  });

  describe('findAll', () => {
    it('페이지네이션된 직원 목록 반환', async () => {
      const paginatedResult = { data: [mockEmployee], total: 1 };
      mockService.findAll.mockResolvedValue(paginatedResult);
      const result = await controller.findAll({ page: 1, limit: 20 });
      expect(result).toEqual(paginatedResult);
      expect(mockService.findAll).toHaveBeenCalledWith(1, 20);
    });

    it('page/limit 기본값 적용', async () => {
      mockService.findAll.mockResolvedValue({ data: [], total: 0 });
      await controller.findAll({});
      expect(mockService.findAll).toHaveBeenCalledWith(1, 20);
    });
  });

  describe('findOne', () => {
    it('id로 직원 조회', async () => {
      mockService.findOne.mockResolvedValue(mockEmployee);
      const result = await controller.findOne(207);
      expect(result).toEqual(mockEmployee);
      expect(mockService.findOne).toHaveBeenCalledWith(207);
    });

    it('존재하지 않는 id → NotFoundException 전파', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne(9999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('직원 정보 수정', async () => {
      const updated = { ...mockEmployee, salary: 30000 };
      mockService.update.mockResolvedValue(updated);
      const result = await controller.update(207, { salary: 30000 } as any);
      expect(result).toEqual(updated);
      expect(mockService.update).toHaveBeenCalledWith(207, { salary: 30000 });
    });
  });

  describe('remove', () => {
    it('직원 삭제', async () => {
      mockService.remove.mockResolvedValue(undefined);
      await expect(controller.remove(207)).resolves.toBeUndefined();
      expect(mockService.remove).toHaveBeenCalledWith(207);
    });

    it('존재하지 않는 id → NotFoundException 전파', async () => {
      mockService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove(9999)).rejects.toThrow(NotFoundException);
    });
  });
});
