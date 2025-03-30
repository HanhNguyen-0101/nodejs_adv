import { Module } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { ShippingController } from './shipping.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.SERVICE_SHIPPING_NAME ?? '',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URLS ?? ''],
          queue: process.env.RMQ_SHIPPING_QUEUE,
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [ShippingController],
  providers: [ShippingService],
  exports: [ShippingService],
})
export class ShippingModule {}
