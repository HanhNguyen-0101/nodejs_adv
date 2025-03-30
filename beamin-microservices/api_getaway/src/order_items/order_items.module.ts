import { Module } from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { OrderItemsController } from './order_items.controller';
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
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
  exports: [OrderItemsService],
})
export class OrderItemsModule {}
