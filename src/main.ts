import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.ALLOWED_ORIGINS?.split(',')
          : ['http://localhost:3000'],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    },
  });
  app.use(helmet());
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

  const configService = app.get(ConfigService);
  const listenPort = configService.get<number>('PORT', 3000);
  await app.listen(listenPort);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
