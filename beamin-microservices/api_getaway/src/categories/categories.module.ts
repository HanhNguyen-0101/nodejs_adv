import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.SERVICE_PRODUCT_NAME ?? '',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URLS ?? ''],
          queue: process.env.RMQ_PRODUCT_QUEUE,
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
