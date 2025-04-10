import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('shipping.create')
  async create(createShippingDto: CreateShippingDto) {
    return await this.appService.create(createShippingDto);
  }

  @MessagePattern('shipping.find_all')
  async findAll() {
    return await this.appService.findAll({});
  }

  @MessagePattern('shipping.find_one')
  async findOne(payload: { id: number }) {
    return await this.appService.findOne({ shippingid: +payload.id });
  }

  @MessagePattern('shipping.update')
  async update(payload: { id: number; updateShippingDto: UpdateShippingDto }) {
    return await this.appService.update({
      where: { shippingid: +payload.id },
      data: payload.updateShippingDto,
    });
  }

  @MessagePattern('shipping.remove')
  async remove(payload: { id: number }) {
    return await this.appService.remove({ shippingid: +payload.id });
  }
}
