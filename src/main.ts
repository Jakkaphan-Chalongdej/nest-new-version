import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './shared/http-exception';
import { TransformInterceptor } from './shared/http-interception';
import { basicMiddleware } from './shared/middleware/basic.middleware';
import * as morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix(config.get<string>('app.prefixApi'));
  const options = new DocumentBuilder()
    .setTitle('NESTJS DEMO API')
    .setVersion('1.0')
    .addBearerAuth({ in: 'headers', type: 'http' })
    .build();
  app.use(
    '/api/docs',
    basicMiddleware(
      config.get('app.basicUsername'),
      config.get('app.basicPassword'),
    ),
  );
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  app.use(helmet());
  app.use(morgan('tiny'));
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: config.get<boolean>('app.isProduction'),
      transform: true,
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.set('trust proxy', 1);
  app.use(json({ limit: '15mb' }));
  app.enableCors({
    credentials: true,
    origin: (origin, callback) => {
      return callback(null, true);
    },
    methods: 'GET,PUT,POST,DELETE',
  });

  await app.listen(config.get<number>('app.port'));
  console.log(`Application is running on: ${await app.getUrl()}/api/docs`);
}
bootstrap();
