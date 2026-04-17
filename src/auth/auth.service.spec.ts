import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const hashedPassword = bcrypt.hashSync('correctpassword', 10);

  const mockUser = {
    id: 1,
    userid: 'testuser',
    username: 'Test User',
    password: hashedPassword,
  } as any;

  const mockRefreshTokenRepo = {
    create: jest.fn().mockResolvedValue({}),
    findOne: jest.fn(),
    destroy: jest.fn().mockResolvedValue(1),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            findById: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock.jwt.token'),
          },
        },
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue(7) },
        },
        {
          provide: 'REFRESH_TOKEN_REPOSITORY',
          useValue: mockRefreshTokenRepo,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signIn', () => {
    it('올바른 자격증명 → access_token + refresh_token 반환', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await service.signIn({
        userid: 'testuser',
        password: 'correctpassword',
      });

      expect(result.access_token).toBe('mock.jwt.token');
      expect(result.refresh_token).toBeDefined();
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        userId: mockUser.userid,
        userName: mockUser.username,
      });
    });

    it('잘못된 비밀번호 → UnauthorizedException', async () => {
      usersService.findOne.mockResolvedValue(mockUser);
      await expect(
        service.signIn({ userid: 'testuser', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('존재하지 않는 userid → UnauthorizedException', async () => {
      usersService.findOne.mockResolvedValue(undefined);
      await expect(
        service.signIn({ userid: 'nobody', password: 'anypassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('유효한 refresh token → 새 access_token 반환', async () => {
      mockRefreshTokenRepo.findOne.mockResolvedValue({
        user_id: 1,
        token: hashToken('valid-token'),
        expires_at: new Date(Date.now() + 1000 * 60 * 60),
      });
      usersService.findById.mockResolvedValue(mockUser);

      const result = await service.refresh('valid-token');
      expect(result.access_token).toBe('mock.jwt.token');
      // findOne이 hash된 token으로 조회되는지 확인
      expect(mockRefreshTokenRepo.findOne).toHaveBeenCalledWith({
        where: { token: hashToken('valid-token') },
      });
    });

    it('만료된 refresh token → UnauthorizedException', async () => {
      mockRefreshTokenRepo.findOne.mockResolvedValue({
        user_id: 1,
        token: hashToken('expired-token'),
        expires_at: new Date(Date.now() - 1000),
        destroy: jest.fn(),
      });

      await expect(service.refresh('expired-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('없는 token → UnauthorizedException', async () => {
      mockRefreshTokenRepo.findOne.mockResolvedValue(null);
      await expect(service.refresh('no-token')).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('logout', () => {
    it('refresh token 해시화 후 삭제', async () => {
      const token = 'some-token';
      await service.logout(token);
      const calledWith = mockRefreshTokenRepo.destroy.mock.calls[0][0];
      expect(calledWith.where.token).not.toBe(token); // plain text가 아닌 hash 저장
      expect(calledWith.where.token).toHaveLength(64); // sha256 hex = 64 chars
    });
  });
});
