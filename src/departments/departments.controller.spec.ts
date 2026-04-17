import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

const mockDepartment = {
  department_id: 10,
  department_name: 'Finance',
  manager_id: 200,
  location_id: 1700,
};

const mockService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('DepartmentsController', () => {
  let controller: DepartmentsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [{ provide: DepartmentsService, useValue: mockService }],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('부서 생성 → 생성된 부서 반환', async () => {
      const dto = { department_name: 'Finance', manager_id: 200, location_id: 1700 };
      mockService.create.mockResolvedValue(mockDepartment);
      const result = await controller.create(dto as any);
      expect(result).toEqual(mockDepartment);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('페이지네이션된 부서 목록 반환', async () => {
      const paginatedResult = { data: [mockDepartment], total: 1 };
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
    it('id로 부서 조회', async () => {
      mockService.findOne.mockResolvedValue(mockDepartment);
      const result = await controller.findOne(10);
      expect(result).toEqual(mockDepartment);
      expect(mockService.findOne).toHaveBeenCalledWith(10);
    });

    it('존재하지 않는 id → NotFoundException 전파', async () => {
      mockService.findOne.mockRejectedValue(new NotFoundException());
      await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('부서 정보 수정', async () => {
      const updated = { ...mockDepartment, department_name: 'Updated Finance' };
      mockService.update.mockResolvedValue(updated);
      const result = await controller.update(10, { department_name: 'Updated Finance' } as any);
      expect(result).toEqual(updated);
      expect(mockService.update).toHaveBeenCalledWith(10, { department_name: 'Updated Finance' });
    });
  });

  describe('remove', () => {
    it('부서 삭제', async () => {
      mockService.remove.mockResolvedValue(undefined);
      await expect(controller.remove(10)).resolves.toBeUndefined();
      expect(mockService.remove).toHaveBeenCalledWith(10);
    });

    it('존재하지 않는 id → NotFoundException 전파', async () => {
      mockService.remove.mockRejectedValue(new NotFoundException());
      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
