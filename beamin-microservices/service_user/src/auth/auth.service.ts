/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AppService } from 'src/app.service';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly appService: AppService) {}
  async signup(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.appService.create({
        username: createUserDto.username,
        password_hash: hashedPassword,
        email: createUserDto.email
      });
      if (!user) {
        throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException(
            'Username already exists',
            HttpStatus.CONFLICT,
          );  
        }
      }
      throw error;
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.appService.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user;
    }
    return null;
  }
}

