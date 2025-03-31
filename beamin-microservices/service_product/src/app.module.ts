import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ShopsModule } from './shops/shops.module';
import { CategoriesModule } from './categories/categories.module';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchModule } from './search/search.module';
import { CacheService } from './cache/cache.service';

@Module({
  imports: [
    PrismaModule,
    ShopsModule,
    CategoriesModule,
    ElasticsearchModule,
    SearchModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, CacheService],
})
export class AppModule {}
