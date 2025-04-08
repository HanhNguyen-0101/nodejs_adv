import { Controller, HttpException, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.signup')
  async signup(createUserDto: CreateUserDto) {
    const { name, password, email, address, phone } = createUserDto;
    return await this.authService.signup({ name, password, email, address, phone });
  }

  @MessagePattern('auth.login')
  async login(payload: { phone: string; password: string }) {
    const { phone, password } = payload;
    const user = await this.authService.validateUser(phone, password);

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}