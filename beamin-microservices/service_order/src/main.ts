import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URLS ?? ''],
      queue: process.env.RMQ_ORDER_QUEUE,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.listen();
  console.log('Microservice(Order) is running and connected to RabbitMQ...');
}
bootstrap();