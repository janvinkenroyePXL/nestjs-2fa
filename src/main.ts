import { NestFactory } from '@nestjs/core';
import corsConfig from './config/cors.config';
import httpsConfig from './config/https.config';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: httpsConfig,
  });
  app.enableCors(corsConfig);
  await app.listen(8001);
}
bootstrap();
