import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LazyModule } from './lazy/lazy.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3420);
}
bootstrap();
