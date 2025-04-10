import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ShopsModule } from './shops/shops.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TagsModule } from './tags/tags.module';
import { CouponsModule } from './coupons/coupons.module';
import { ProductTagsModule } from './product_tags/product_tags.module';
import { ProductCouponsModule } from './product_coupons/product_coupons.module';
import { ShippingModule } from './shipping/shipping.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemsModule } from './order_items/order_items.module';

@Module({
  imports: [
    UsersModule,
    ShopsModule,
    CategoriesModule,
    TagsModule,
    CouponsModule,
    ProductTagsModule,
    ProductCouponsModule,
    ProductsModule,
    // OrdersModule,
    // OrderItemsModule,
    // ShippingModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
