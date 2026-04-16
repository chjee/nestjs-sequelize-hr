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
      authService.signIn.mockResolvedValue({ access_token: 'mock.jwt.token' });

      const result = await controller.signIn({
        userid: 'testuser',
        password: 'correctpassword',
      });

      expect(result).toEqual({ access_token: 'mock.jwt.token' });
    });

    it('잘못된 자격증명 → UnauthorizedException 전파', async () => {
      authService.signIn.mockRejectedValue(new UnauthorizedException());

      await expect(
        controller.signIn({ userid: 'testuser', password: 'wrong' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
