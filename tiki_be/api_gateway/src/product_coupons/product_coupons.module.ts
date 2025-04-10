import { Module } from '@nestjs/common';
import { ProductCouponsService } from './product_coupons.service';
import { ProductCouponsController } from './product_coupons.controller';
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
  controllers: [ProductCouponsController],
  providers: [ProductCouponsService],
  exports: [ProductCouponsService],
})
export class ProductCouponsModule {}
