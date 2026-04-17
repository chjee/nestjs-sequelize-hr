import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
const mockGetResponse = jest.fn().mockReturnValue({ status: mockStatus });
const mockGetRequest = jest
  .fn()
  .mockReturnValue({ url: '/test', method: 'GET', headers: {} });
const mockSwitchToHttp = jest.fn().mockReturnValue({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
});
const mockHost = { switchToHttp: mockSwitchToHttp } as any;

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;
  let loggerErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    filter = new AllExceptionsFilter();
    loggerErrorSpy = jest
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(() => {});
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('HttpException 처리', () => {
    it('404 NotFoundException → 404 상태코드 반환', () => {
      const exception = new HttpException('Not Found', HttpStatus.NOT_FOUND);
      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.NOT_FOUND,
          path: '/test',
        }),
      );
    });

    it('400 BadRequestException → 400 상태코드 반환', () => {
      const exception = new HttpException(
        'Bad Request',
        HttpStatus.BAD_REQUEST,
      );
      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ statusCode: HttpStatus.BAD_REQUEST }),
      );
    });

    it('HttpException 시 logger.error 호출 안 함', () => {
      const exception = new HttpException(
        'Unauthorized',
        HttpStatus.UNAUTHORIZED,
      );
      filter.catch(exception, mockHost);
      expect(loggerErrorSpy).not.toHaveBeenCalled();
    });
  });

  describe('일반 예외(500) 처리', () => {
    it('일반 Error → 500 상태코드 반환', () => {
      const exception = new Error('Something broke');
      filter.catch(exception, mockHost);

      expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal server error',
          path: '/test',
        }),
      );
    });

    it('500 에러 시 구조화된 형식으로 logger.error 호출', () => {
      const exception = new Error('DB connection failed');
      filter.catch(exception, mockHost);
      expect(loggerErrorSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          statusCode: 500,
          error: 'DB connection failed',
          path: '/test',
        }),
      );
    });

    it('응답에 timestamp 포함', () => {
      filter.catch(new Error('test'), mockHost);
      const jsonArg = mockJson.mock.calls[0][0];
      expect(jsonArg.timestamp).toBeDefined();
      expect(new Date(jsonArg.timestamp).getTime()).not.toBeNaN();
    });
  });
});
