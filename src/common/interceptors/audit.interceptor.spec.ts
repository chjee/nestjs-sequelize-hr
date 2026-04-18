import { of } from 'rxjs';
import { AuditInterceptor } from './audit.interceptor';

const mockLog = jest.fn().mockResolvedValue(undefined);
const mockAuditService = { log: mockLog };

function makeContext(method: string, body: any = {}, user?: any) {
  const req: any = { method, url: '/test', body, headers: {}, user };
  const res: any = { statusCode: 200 };
  return {
    switchToHttp: () => ({
      getRequest: () => req,
      getResponse: () => res,
    }),
    _req: req,
  } as any;
}

const mockNext = { handle: () => of(null) } as any;

describe('AuditInterceptor', () => {
  let interceptor: AuditInterceptor;

  beforeEach(() => {
    jest.clearAllMocks();
    interceptor = new AuditInterceptor(mockAuditService as any);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('WRITE_METHODS 필터링', () => {
    it('GET 요청은 audit 로그를 남기지 않음', (done) => {
      interceptor.intercept(makeContext('GET'), mockNext).subscribe(() => {
        expect(mockLog).not.toHaveBeenCalled();
        done();
      });
    });

    it.each(['POST', 'PATCH', 'PUT', 'DELETE'])(
      '%s 요청은 audit 로그를 남김',
      (method, done: any) => {
        interceptor.intercept(makeContext(method), mockNext).subscribe(() => {
          setTimeout(() => {
            expect(mockLog).toHaveBeenCalled();
            done();
          }, 0);
        });
      },
    );
  });

  describe('sanitizeBody - 민감 필드 마스킹', () => {
    it('password 필드를 [REDACTED]로 치환', (done) => {
      const body = { username: 'user1', password: 'secret123' };
      interceptor.intercept(makeContext('POST', body), mockNext).subscribe(() => {
        setTimeout(() => {
          const logged = JSON.parse(mockLog.mock.calls[0][0].request_body);
          expect(logged.password).toBe('[REDACTED]');
          expect(logged.username).toBe('user1');
          done();
        }, 0);
      });
    });

    it('newPassword 필드를 [REDACTED]로 치환', (done) => {
      const body = { newPassword: 'newSecret!1', currentPassword: 'old!1' };
      interceptor.intercept(makeContext('PATCH', body), mockNext).subscribe(() => {
        setTimeout(() => {
          const logged = JSON.parse(mockLog.mock.calls[0][0].request_body);
          expect(logged.newPassword).toBe('[REDACTED]');
          expect(logged.currentPassword).toBe('[REDACTED]');
          done();
        }, 0);
      });
    });

    it('confirmPassword 필드를 [REDACTED]로 치환', (done) => {
      const body = { password: 'abc', confirmPassword: 'abc' };
      interceptor.intercept(makeContext('POST', body), mockNext).subscribe(() => {
        setTimeout(() => {
          const logged = JSON.parse(mockLog.mock.calls[0][0].request_body);
          expect(logged.password).toBe('[REDACTED]');
          expect(logged.confirmPassword).toBe('[REDACTED]');
          done();
        }, 0);
      });
    });

    it('민감 필드가 없는 body는 그대로 저장', (done) => {
      const body = { department_name: 'Engineering', location_id: 1 };
      interceptor.intercept(makeContext('POST', body), mockNext).subscribe(() => {
        setTimeout(() => {
          const logged = JSON.parse(mockLog.mock.calls[0][0].request_body);
          expect(logged).toEqual(body);
          done();
        }, 0);
      });
    });

    it('body가 없으면 request_body는 undefined', (done) => {
      const ctx = makeContext('DELETE');
      ctx._req.body = undefined;
      interceptor.intercept(ctx, mockNext).subscribe(() => {
        setTimeout(() => {
          expect(mockLog.mock.calls[0][0].request_body).toBeUndefined();
          done();
        }, 0);
      });
    });
  });

  describe('audit log 데이터', () => {
    it('user_id, method, path, status_code 를 올바르게 기록', (done) => {
      const ctx = makeContext('POST', { name: 'test' });
      ctx._req.user = { userId: 'user42' };
      interceptor.intercept(ctx, mockNext).subscribe(() => {
        setTimeout(() => {
          expect(mockLog).toHaveBeenCalledWith(
            expect.objectContaining({
              user_id: 'user42',
              method: 'POST',
              path: '/test',
              status_code: 200,
            }),
          );
          done();
        }, 0);
      });
    });

    it('인증되지 않은 요청은 user_id가 undefined', (done) => {
      interceptor.intercept(makeContext('POST', { name: 'test' }), mockNext).subscribe(() => {
        setTimeout(() => {
          expect(mockLog.mock.calls[0][0].user_id).toBeUndefined();
          done();
        }, 0);
      });
    });
  });
});
