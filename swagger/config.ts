import { DocumentBuilder } from '@nestjs/swagger';

const config = new DocumentBuilder()
  .setTitle('Beat Bridge')
  .setDescription('Beat Bridge internal API')
  .setVersion('1.0.0')
  .build();

export default config;
