import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot({ throttlers: [{ ttl: 60000, limit: 10 }] }),
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            refresh: jest.fn(),
            logout: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('올바른 자격증명 → access_token 반환', async () => {
      const mockResponse = {
        access_token: 'mock.jwt.token',
        refresh_token: 'mock.refresh.token',
      };
      authService.signIn.mockResolvedValue(mockResponse);

      const result = await controller.signIn({
        userid: 'testuser',
        password: 'correctpassword',
      });

      expect(result).toEqual(mockResponse);
    });

    it('잘못된 자격증명 → UnauthorizedException 전파', async () => {
      authService.signIn.mockRejectedValue(new UnauthorizedException());

      await expect(
        controller.signIn({ userid: 'testuser', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refresh', () => {
    it('refresh_token으로 새 access_token 반환', async () => {
      authService.refresh.mockResolvedValue({ access_token: 'new.jwt.token' });

      const result = await controller.refresh({
        refresh_token: 'mock.refresh.token',
      });

      expect(result).toEqual({ access_token: 'new.jwt.token' });
      expect(authService.refresh).toHaveBeenCalledWith('mock.refresh.token');
    });
  });

  describe('logout', () => {
    it('refresh_token을 무효화', async () => {
      authService.logout.mockResolvedValue(undefined);

      await controller.logout({ refresh_token: 'mock.refresh.token' });

      expect(authService.logout).toHaveBeenCalledWith('mock.refresh.token');
    });
  });
});
