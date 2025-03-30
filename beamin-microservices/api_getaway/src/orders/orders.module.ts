import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "ORDER_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@localhost:5672"],
          queue: "order_queue",
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
