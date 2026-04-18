import {
  RequestIdMiddleware,
  REQUEST_ID_HEADER,
} from './request-id.middleware';

function makeReqRes(existingId?: string) {
  const req: any = { headers: {} };
  if (existingId) req.headers[REQUEST_ID_HEADER] = existingId;
  const res: any = { setHeader: jest.fn() };
  const next = jest.fn();
  return { req, res, next };
}

describe('RequestIdMiddleware', () => {
  let middleware: RequestIdMiddleware;

  beforeEach(() => {
    middleware = new RequestIdMiddleware();
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  it('x-request-id 헤더가 없으면 UUID를 생성하여 설정', () => {
    const { req, res, next } = makeReqRes();
    middleware.use(req, res, next);

    const id = req.headers[REQUEST_ID_HEADER];
    expect(id).toBeDefined();
    expect(id).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    );
  });

  it('x-request-id 헤더가 있으면 그대로 사용', () => {
    const { req, res, next } = makeReqRes('existing-id-123');
    middleware.use(req, res, next);

    expect(req.headers[REQUEST_ID_HEADER]).toBe('existing-id-123');
  });

  it('응답 헤더에도 x-request-id를 설정', () => {
    const { req, res, next } = makeReqRes();
    middleware.use(req, res, next);

    expect(res.setHeader).toHaveBeenCalledWith(
      REQUEST_ID_HEADER,
      req.headers[REQUEST_ID_HEADER],
    );
  });

  it('next()를 호출', () => {
    const { req, res, next } = makeReqRes();
    middleware.use(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('요청마다 고유한 UUID 생성', () => {
    const { req: req1, res: res1, next: next1 } = makeReqRes();
    const { req: req2, res: res2, next: next2 } = makeReqRes();
    middleware.use(req1, res1, next1);
    middleware.use(req2, res2, next2);

    expect(req1.headers[REQUEST_ID_HEADER]).not.toBe(
      req2.headers[REQUEST_ID_HEADER],
    );
  });
});
