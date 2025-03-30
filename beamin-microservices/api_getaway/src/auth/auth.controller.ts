import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('USER_NAME') private userService: ClientProxy) {}
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(this.userService.send('auth.signup', createUserDto));
  }

  @Post('/login')
  async login(@Body() payload: { username: string; password: string }) {
    return await lastValueFrom(this.userService.send('auth.login', payload));
  }
}
