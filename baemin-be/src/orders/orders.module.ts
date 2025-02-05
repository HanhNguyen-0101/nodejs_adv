import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { ShippingModule } from 'src/shipping/shipping.module';
import { OrderItemsModule } from 'src/order_items/order_items.module';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [ShippingModule, OrderItemsModule],
})
export class OrdersModule {}
