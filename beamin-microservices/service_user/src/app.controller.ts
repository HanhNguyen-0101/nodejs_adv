import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('users.create')
  async create(createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;
    return await this.appService.create({
      username,
      email,
      password_hash: '111',
    });
  }

  @MessagePattern('users.find_all')
  async findAll() {
    return await this.appService.findAll({});
  }

  @MessagePattern('users.find_one')
  async findOne(payload: { id: string }) {
    return await this.appService.findOne({ user_id: +payload.id });
  }

  @MessagePattern('users.update')
  async update(payload: { id: string; updateUserDto: UpdateUserDto }) {
    return await this.appService.update({
      where: { user_id: +payload.id },
      data: payload.updateUserDto,
    });
  }

  @MessagePattern('users.remove')
  async remove(payload: { id: string }) {
    return await this.appService.remove({ user_id: +payload.id });
  }
}