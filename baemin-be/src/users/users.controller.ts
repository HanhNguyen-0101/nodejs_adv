/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    return this.usersService.create({
      username,
      email,
      password_hash: '111',
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ user_id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update({
      where: { user_id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ user_id: +id });
  }
}
