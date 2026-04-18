import { HealthController } from './health.controller';

const mockCheck = jest.fn();
const mockAuthenticate = jest.fn();

const mockHealthService = { check: mockCheck };
const mockSequelize = { authenticate: mockAuthenticate };

describe('HealthController', () => {
  let controller: HealthController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new HealthController(
      mockHealthService as any,
      mockSequelize as any,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check()', () => {
    it('DB 연결 성공 시 healthy 상태 반환', async () => {
      mockAuthenticate.mockResolvedValueOnce(undefined);
      mockCheck.mockImplementationOnce(
        async (indicators: (() => Promise<any>)[]) => {
          const result = await indicators[0]();
          return { status: 'ok', info: result };
        },
      );

      const result = await controller.check();
      expect(result.status).toBe('ok');
    });

    it('DB 연결 실패 시 unhealthy 상태 반환', async () => {
      mockAuthenticate.mockRejectedValueOnce(new Error('Connection refused'));
      mockCheck.mockImplementationOnce(
        async (indicators: (() => Promise<any>)[]) => {
          const result = await indicators[0]();
          return { status: 'error', info: result };
        },
      );

      const result = await controller.check();
      expect(result.status).toBe('error');
    });

    it('health.check()에 indicator 함수를 전달', async () => {
      mockCheck.mockResolvedValueOnce({ status: 'ok' });
      await controller.check();

      expect(mockCheck).toHaveBeenCalledWith(
        expect.arrayContaining([expect.any(Function)]),
      );
    });
  });
});
