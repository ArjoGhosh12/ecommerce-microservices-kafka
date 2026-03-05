import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'notification-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'notification-consumer',
        },
      },
    },
  );

  await app.listen();

  Logger.log('Notification Service listening to Kafka...');
}

bootstrap();