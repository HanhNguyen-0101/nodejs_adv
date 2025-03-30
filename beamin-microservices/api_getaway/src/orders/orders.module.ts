import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.SERVICE_ORDER_NAME ?? '',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URLS ?? ''],
          queue: process.env.RMQ_ORDER_QUEUE,
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
