import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register(
    [
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
  controllers: [ShopsController],
  providers: [ShopsService],
  exports: [ShopsService],
})
export class ShopsModule {}
