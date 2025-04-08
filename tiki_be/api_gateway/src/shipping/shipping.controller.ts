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
import { UpdateShippingDto } from './dto/update-shipping.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Controller('shipping')
export class ShippingController {
  constructor(@Inject('SHIPPING_NAME') private shippingService: ClientProxy) {}

  @Post()
  async create(@Body() createShippingDto: CreateShippingDto) {
    const result$ = this.shippingService.send('shipping.create', createShippingDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.shippingService.send('shipping.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result$ = this.shippingService.send('shipping.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShippingDto: UpdateShippingDto,
  ) {
    const result$ = this.shippingService.send('shipping.update', { id, updateShippingDto });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result$ = this.shippingService.send('shipping.remove', { id });
    return await lastValueFrom(result$);
  }
}
