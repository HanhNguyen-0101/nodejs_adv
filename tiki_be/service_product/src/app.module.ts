import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShopsModule } from './shops/shops.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { SearchModule } from './search/search.module';
import { CacheService } from './cache/cache.service';
import { TagsModule } from './tags/tags.module';
import { CouponsModule } from './coupons/coupons.module';
import { ProductTagsModule } from './product_tags/product_tags.module';
import { ProductCouponsModule } from './product_coupons/product_coupons.module';

@Module({
  imports: [
    PrismaModule,
    ShopsModule,
    CategoriesModule,
    TagsModule,
    CouponsModule,
    ProductTagsModule,
    ProductCouponsModule,
    SearchModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
