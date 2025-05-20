import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
