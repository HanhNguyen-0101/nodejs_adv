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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderItemDto } from 'src/order_items/dto/create-order_item.dto';
import { CreateShippingDto } from 'src/shipping/dto/create-shipping.dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject('ORDER_NAME') private ordersService: ClientProxy) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const result$ = this.ordersService.send('orders.create', createOrderDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.ordersService.send('orders.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result$ = this.ordersService.send('orders.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const result$ = this.ordersService.send('orders.update', {
      id,
      updateOrderDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result$ = this.ordersService.send('orders.remove', { id });
    return await lastValueFrom(result$);
  }

  @Post('makepayment')
  async makePayment(
    @Body()
    payload: {
      users: any,
      order_items: CreateOrderItemDto[],
      shipping: CreateShippingDto,
      total: number,
    },
  ) {
    const result$ = this.ordersService.send('orders.makepayment', payload);
    return await lastValueFrom(result$);
  }
}
