import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: {
      origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Oracle HR Example')
    .setDescription('The HR API description')
    .setVersion('1.0')
    .addTag('HR')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT', // Key name in the swagger
        description: 'Enter JWT token',
        bearerFormat: 'JWT', // Optional
        in: 'header',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  const configSerivce = app.get(ConfigService);
  const listenPort = configSerivce.get<number>('PORT', 3000);
  await app.listen(listenPort);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
