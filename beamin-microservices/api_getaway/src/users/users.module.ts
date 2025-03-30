import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: process.env.SERVICE_USER_NAME ?? '',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URLS ?? ''],
          queue: process.env.RMQ_USER_QUEUE,
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
