import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "USER_NAME",
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:1234@localhost:5672"],
          queue: "user_queue",
          queueOptions: {
            durable: false
          }
        }
      },
    ]
  )],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
