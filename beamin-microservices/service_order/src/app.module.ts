import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderItemsModule } from './order_items/order_items.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [PrismaModule, OrderItemsModule,
    ClientsModule.register([
      {
        name: "SHIPPING_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@localhost:5672"],
          queue: "shipping_queue",
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
