import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let jwtService: jest.Mocked<JwtService>;

  const hashedPassword = bcrypt.hashSync('correctpassword', 10);

  const mockUser = {
    userid: 'testuser',
    username: 'Test User',
    password: hashedPassword,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue('mock.jwt.token'),
          },
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
    it('올바른 자격증명 → access_token 반환', async () => {
      usersService.findOne.mockResolvedValue(mockUser);

      const result = await service.signIn({
        userid: 'testuser',
        password: 'correctpassword',
      });

      expect(result).toEqual({ access_token: 'mock.jwt.token' });
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
});
