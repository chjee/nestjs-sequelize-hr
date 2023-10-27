import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: { origin: '*', methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configSerivce = app.get(ConfigService);
  const listenPort = configSerivce.get<number>('PORT', 3000);
  await app.listen(listenPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
