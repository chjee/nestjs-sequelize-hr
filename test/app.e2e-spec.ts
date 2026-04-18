import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { configureE2eEnvironment, createE2eProviderMocks } from './e2e-testing';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let sequelize: { close: jest.Mock };

  beforeEach(async () => {
    configureE2eEnvironment();
    const { AppModule } = await import('./../src/app.module');
    const providerMocks = createE2eProviderMocks();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('SEQUELIZE')
      .useValue(providerMocks.sequelize)
      .overrideProvider('USER_REPOSITORY')
      .useValue(providerMocks.userRepository)
      .overrideProvider('REFRESH_TOKEN_REPOSITORY')
      .useValue(providerMocks.refreshTokenRepository)
      .overrideProvider('EMPLOYEE_REPOSITORY')
      .useValue(providerMocks.employeeRepository)
      .overrideProvider('DEPARTMENT_REPOSITORY')
      .useValue(providerMocks.departmentRepository)
      .overrideProvider('AUDIT_LOG_REPOSITORY')
      .useValue(providerMocks.auditLogRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    sequelize = app.get('SEQUELIZE');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    if (app) {
      await app.get<Sequelize>('SEQUELIZE').close();
      await app.close();
    }
    expect(sequelize.close).toHaveBeenCalled();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('GET /health', () => {
    it('DB 연결 상태 반환', () => {
      return request(app.getHttpServer())
        .get('/health')
        .expect((res) => {
          expect([200, 503]).toContain(res.status);
          expect(res.body).toHaveProperty('status');
        });
    });
  });

  describe('Auth flow', () => {
    describe('POST /auth/login', () => {
      it('잘못된 자격증명 → 401', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ userid: 'wronguser', password: 'Wrongpass1@' })
          .expect(401);
      });

      it('입력 검증 실패(짧은 userid) → 400', () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ userid: 'ab', password: 'short' })
          .expect(400);
      });
    });

    describe('POST /auth/refresh', () => {
      it('유효하지 않은 refresh token → 401', () => {
        return request(app.getHttpServer())
          .post('/auth/refresh')
          .send({ refresh_token: 'invalid-token' })
          .expect(401);
      });

      it('refresh token 누락 → 400', () => {
        return request(app.getHttpServer())
          .post('/auth/refresh')
          .send({})
          .expect(400);
      });
    });

    describe('Protected routes', () => {
      it('토큰 없이 /auth/profile 접근 → 401', () => {
        return request(app.getHttpServer()).get('/auth/profile').expect(401);
      });

      it('토큰 없이 /users 접근 → 401', () => {
        return request(app.getHttpServer()).get('/users').expect(401);
      });

      it('토큰 없이 /employees 접근 → 401', () => {
        return request(app.getHttpServer()).get('/employees').expect(401);
      });

      it('토큰 없이 /departments 접근 → 401', () => {
        return request(app.getHttpServer()).get('/departments').expect(401);
      });
    });
  });
});
