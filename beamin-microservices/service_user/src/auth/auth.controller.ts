import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async signup(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    return await this.authService.signup({ username, password, email });
  }

  @MessagePattern('auth.login')
  async login(payload: { username: string; password: string }) {
    const { username, password } = payload;
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}