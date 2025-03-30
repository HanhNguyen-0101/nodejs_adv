import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
