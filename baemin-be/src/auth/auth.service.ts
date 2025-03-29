/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service'; // Assuming you have a UsersService to interact with the user data
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(createUserDto: CreateUserDto): Promise<any> {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = await this.usersService.create({
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
    const user = await this.usersService.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password_hash))) {
      return user;
    }
    return null;
  }
}

