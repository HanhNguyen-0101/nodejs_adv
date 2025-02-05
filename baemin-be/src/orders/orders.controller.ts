import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from 'src/users/entities/user.entity';
import { CreateShippingDto } from 'src/shipping/dto/create-shipping.dto';
import { CreateOrderItemDto } from 'src/order_items/dto/create-order_item.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne({ order_id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update({
      where: { order_id: +id },
      data: updateOrderDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove({ order_id: +id });
  }

  @Post('makepayment')
  async makepayment(
    @Body()
    body: {
      users: User;
      order_items: CreateOrderItemDto[];
      shipping: CreateShippingDto;
      total: number;
    },
  ) {
    return this.ordersService.makepayment(body);
  }
}
