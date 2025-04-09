import { Module } from '@nestjs/common';
import { ProductTagsService } from './product_tags.service';
import { ProductTagsController } from './product_tags.controller';

@Module({
  providers: [ProductTagsService],
  controllers: [ProductTagsController],
  exports: [ProductTagsService],
})
export class ProductTagsModule {}
