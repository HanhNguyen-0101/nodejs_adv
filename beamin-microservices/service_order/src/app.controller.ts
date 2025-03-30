import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from './entities/user.entity';
import { CreateOrderItemDto } from './order_items/dto/create-order_item.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('orders.create')
  async create(createOrderDto: CreateOrderDto) {
    return await this.appService.create(createOrderDto);
  }

  @MessagePattern('orders.find_all')
  async findAll() {
    return await this.appService.findAll({});
  }

  @MessagePattern('orders.find_one')
  async findOne(payload: { id: string }) {
    return await this.appService.findOne({ order_id: +payload.id });
  }

  @MessagePattern('orders.update')
  async update(payload: { id: string; updateOrderDto: UpdateOrderDto }) {
    return await this.appService.update({
      where: { order_id: +payload.id },
      data: payload.updateOrderDto,
    });
  }

  @MessagePattern('orders.remove')
  async remove(payload: { id: string }) {
    return await this.appService.remove({ order_id: +payload.id });
  }

  @MessagePattern('orders.makepayment')
  async makepayment(payload: {
    users: User;
    order_items: CreateOrderItemDto[];
    shipping: CreateShippingDto;
    total: number;
  }) {
    return await this.appService.makepayment(payload);
  }
}