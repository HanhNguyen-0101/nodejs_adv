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
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(@Inject('ORDER_NAME') private ordersService: ClientProxy) {}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    const result$ = this.ordersService.send(
      'order_items.create',
      createOrderItemDto,
    );
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.ordersService.send('order_items.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result$ = this.ordersService.send('order_items.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ) {
    const result$ = this.ordersService.send('order_items.update', {
      id,
      updateOrderItemDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result$ = this.ordersService.send('order_items.remove', { id });
    return await lastValueFrom(result$);
  }
}
