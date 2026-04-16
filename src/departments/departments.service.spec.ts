import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/department.entity';

const mockDepartment = {
  department_id: 11,
  department_name: 'Holding',
} as unknown as Department;

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('DepartmentsService', () => {
  let service: DepartmentsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        { provide: 'DEPARTMENT_REPOSITORY', useValue: mockRepository },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('존재하는 id → Department 반환', async () => {
      mockRepository.findOne.mockResolvedValue(mockDepartment);
      const result = await service.findOne(11);
      expect(result).toEqual(mockDepartment);
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('존재하는 id → 수정 후 Department 반환', async () => {
      mockRepository.update.mockResolvedValue([1]);
      mockRepository.findOne.mockResolvedValue(mockDepartment);
      const result = await service.update(11, { department_name: 'Updated' });
      expect(result).toEqual(mockDepartment);
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.update.mockResolvedValue([0]);
      await expect(
        service.update(999, { department_name: 'Updated' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('존재하는 id → void 반환', async () => {
      mockRepository.destroy.mockResolvedValue(1);
      await expect(service.remove(11)).resolves.toBeUndefined();
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockRepository.destroy.mockResolvedValue(0);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
