import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from './common/logger.service';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3001');

  // First create the app
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: '127.0.0.1',
      port: port,
    },
  });

  // Now get Logger instance from app's DI container
  const logger = app.get(Logger);

  await app.listen();
  
  // Use instance method on your Logger instance
  logger.log(`User Service running on port ${port}`);
}

bootstrap();
