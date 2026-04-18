import { AuditService, AuditEntry } from './audit.service';

const mockCreate = jest.fn().mockResolvedValue(undefined);
const mockAuditLogRepository = { create: mockCreate };

describe('AuditService', () => {
  let service: AuditService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuditService(mockAuditLogRepository as any);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('log()', () => {
    it('전달된 entry를 그대로 저장', async () => {
      const entry: AuditEntry = {
        user_id: 'user1',
        method: 'POST',
        path: '/users',
        request_id: 'req-123',
        status_code: 201,
        request_body: '{"name":"test"}',
      };
      await service.log(entry);
      expect(mockCreate).toHaveBeenCalledWith({ ...entry });
    });

    it('선택 필드 없이도 저장 가능', async () => {
      const entry: AuditEntry = {
        method: 'GET',
        path: '/health',
        status_code: 200,
      };
      await service.log(entry);
      expect(mockCreate).toHaveBeenCalledWith({ ...entry });
    });

    it('저장 실패 시 에러를 그대로 전파', async () => {
      mockCreate.mockRejectedValueOnce(new Error('DB error'));
      await expect(
        service.log({ method: 'POST', path: '/test', status_code: 200 }),
      ).rejects.toThrow('DB error');
    });
  });
});
