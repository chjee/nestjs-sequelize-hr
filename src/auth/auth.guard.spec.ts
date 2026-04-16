import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: jest.Mocked<JwtService>;
  let reflector: jest.Mocked<Reflector>;

  const mockPayload = { userId: 'testuser', userName: 'Test User' };

  beforeEach(() => {
    jwtService = {
      verifyAsync: jest.fn(),
    } as any;

    reflector = {
      getAllAndOverride: jest.fn().mockReturnValue(false),
    } as any;

    guard = new AuthGuard(jwtService, reflector);
  });

  const buildContext = (authHeader?: string): ExecutionContext => {
    return {
      getHandler: jest.fn(),
      getClass: jest.fn(),
      switchToHttp: () => ({
        getRequest: () => ({
          headers: { authorization: authHeader },
          user: undefined,
        }),
      }),
    } as any;
  };

  it('유효한 토큰 → true 반환 및 request.user 설정', async () => {
    jwtService.verifyAsync.mockResolvedValue(mockPayload);
    const context = buildContext('Bearer valid.jwt.token');

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid.jwt.token');
  });

  it('만료/위조 토큰 → UnauthorizedException', async () => {
    jwtService.verifyAsync.mockRejectedValue(new Error('invalid token'));
    const context = buildContext('Bearer bad.token');

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('Authorization 헤더 없음 → UnauthorizedException', async () => {
    const context = buildContext(undefined);

    await expect(guard.canActivate(context)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('@Public() 라우트 → 토큰 없이 통과', async () => {
    reflector.getAllAndOverride.mockReturnValue(true);
    const context = buildContext(undefined);

    const result = await guard.canActivate(context);

    expect(result).toBe(true);
    expect(jwtService.verifyAsync).not.toHaveBeenCalled();
  });
});
