import { Module } from '@nestjs/common';
import { ProductCouponsService } from './product_coupons.service';
import { ProductCouponsController } from './product_coupons.controller';

@Module({
  providers: [ProductCouponsService],
  controllers: [ProductCouponsController],
  exports: [ProductCouponsService],
})
export class ProductCouponsModule {}
