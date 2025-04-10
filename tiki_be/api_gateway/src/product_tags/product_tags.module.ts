import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductTagsService } from './product_tags.service';
import { ProductTagsController } from './product_tags.controller';

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
  controllers: [ProductTagsController],
  providers: [ProductTagsService],
  exports: [ProductTagsService],
})
export class ProductTagsModule {}
