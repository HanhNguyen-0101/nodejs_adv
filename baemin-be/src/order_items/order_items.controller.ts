import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderItemsService } from './order_items.service';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsService.create(createOrderItemDto);
  }

  @Get()
  findAll() {
    return this.orderItemsService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderItemsService.findOne({ order_item_id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    return this.orderItemsService.update({
      where: { order_item_id: +id },
      data: updateOrderItemDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderItemsService.remove({ order_item_id: +id });
  }
}
