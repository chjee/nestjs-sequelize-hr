import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUser = (overrides: Record<string, unknown> = {}) => {
  const base = {
    id: 1,
    userid: 'jsmith',
    username: 'John Smith',
    password: bcrypt.hashSync('password123', 10),
  };
  const merged = { ...base, ...overrides };
  return {
    ...merged,
    toJSON() {
      return merged;
    },
  } as unknown as User;
};

const mockUserRepository = {
  findOne: jest.fn(),
  findAll: jest.fn(),
  findAndCountAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: 'USER_REPOSITORY', useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('userid로 사용자 조회', async () => {
      const user = mockUser();
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.findOne('jsmith');
      expect(result).toBe(user);
    });

    it('존재하지 않는 userid → null', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      const result = await service.findOne('nobody');
      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('페이지네이션된 사용자 목록 반환', async () => {
      const users = [mockUser(), mockUser({ id: 2, userid: 'admin' })];
      mockUserRepository.findAndCountAll.mockResolvedValue({
        rows: users,
        count: 2,
      });
      const result = await service.findAll(1, 20);
      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(2);
    });
  });

  describe('findById', () => {
    it('id로 사용자 조회', async () => {
      const user = mockUser();
      mockUserRepository.findOne.mockResolvedValue(user);
      const result = await service.findById(1);
      expect(result).toBe(user);
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('신규 사용자 생성', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      const created = mockUser();
      mockUserRepository.create.mockResolvedValue(created);
      const result = await service.create({
        userid: 'jsmith',
        username: 'John Smith',
        password: 'password123',
      });
      expect(result).toBeDefined();
      expect(mockUserRepository.create).toHaveBeenCalled();
    });

    it('중복 userid → ConflictException', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser());
      await expect(
        service.create({
          userid: 'jsmith',
          username: 'John Smith',
          password: 'password123',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('사용자 삭제', async () => {
      mockUserRepository.destroy.mockResolvedValue(1);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('존재하지 않는 id → NotFoundException', async () => {
      mockUserRepository.destroy.mockResolvedValue(0);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
