/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { CreateCouponDto } from './dto/create-coupon.dto';

@Controller('coupons')
export class CouponsController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    const result$ = this.productService.send('coupons.create', createCouponDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.productService.send('coupons.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result$ = this.productService.send('coupons.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    const result$ = this.productService.send('coupons.update', {
      id,
      updateCouponDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result$ = this.productService.send('coupons.remove', { id });
    return await lastValueFrom(result$);
  }
}
