import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import config from '../swagger/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET, POST, DELETE, PUT, POST, PATCH',
    credentials: true,
  };

  app.enableCors(corsOptions);

  await app.listen(3000);
}

bootstrap();
