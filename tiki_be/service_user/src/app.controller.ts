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
    const { name, email, phone, address } = createUserDto;
    return await this.appService.create({
      name,
      email,
      phone,
      address,
      password: '111',
    });
  }

  @MessagePattern('users.find_all')
  async findAll() {
    return await this.appService.findAll({});
  }

  @MessagePattern('users.find_one')
  async findOne(payload: { id: number }) {
    return await this.appService.findOne({ userid: +payload.id });
  }

  @MessagePattern('users.update')
  async update(payload: { id: number; updateUserDto: UpdateUserDto }) {
    return await this.appService.update({
      where: { userid: +payload.id },
      data: payload.updateUserDto,
    });
  }

  @MessagePattern('users.remove')
  async remove(payload: { id: number }) {
    return await this.appService.remove({ userid: +payload.id });
  }
}