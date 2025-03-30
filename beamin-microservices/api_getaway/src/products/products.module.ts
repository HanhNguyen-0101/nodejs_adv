import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
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
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
