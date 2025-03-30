/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_NAME') private userService: ClientProxy) {}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(this.userService.send('users.create', createUserDto));
  }

  @Get()
  async findAllUsers() {
    return await lastValueFrom(this.userService.send('users.find_all', {}));
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    return await lastValueFrom(this.userService.send('users.find_one', { id }));
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await lastValueFrom(this.userService
      .send('users.update', { id, updateUserDto }));
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return await lastValueFrom(this.userService.send('users.remove', { id }));
  }
}
