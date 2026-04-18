import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Sequelize } from 'sequelize-typescript';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
    await app.get<Sequelize>('SEQUELIZE').close();
    await app.close();
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
