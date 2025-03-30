import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Controller()
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @MessagePattern('order_items.create')
  async create(createOrderItemDto: CreateOrderItemDto) {
    return await this.orderItemsService.create(createOrderItemDto);
  }

  @MessagePattern('order_items.find_all')
  async findAll() {
    return await this.orderItemsService.findAll({});
  }

  @MessagePattern('order_items.find_one')
  async findOne(payload: { id: string }) {
    return await this.orderItemsService.findOne({ order_item_id: +payload.id });
  }

  @MessagePattern('order_items.update')
  async update(payload: { id: string; updateOrderItemDto: UpdateOrderItemDto }) {
    return await this.orderItemsService.update({
      where: { order_item_id: +payload.id },
      data: payload.updateOrderItemDto,
    });
  }

  @MessagePattern('order_items.remove')
  async remove(payload: { id: string }) {
    return await this.orderItemsService.remove({ order_item_id: +payload.id });
  }
}