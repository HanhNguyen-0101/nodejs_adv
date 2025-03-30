import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [
      {
        name: "PRODUCT_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@localhost:5672"],
          queue: "product_queue",
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
