/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { CreateProductCouponDto } from './dto/create-product_coupon.dto';
import { UpdateProductCouponDto } from './dto/update-product_coupon.dto';

@Controller('product-coupons')
export class ProductCouponsController {
  constructor(@Inject('PRODUCT_NAME') private ordersService: ClientProxy) {}

  @Post()
  async create(@Body() createProductCouponDto: CreateProductCouponDto) {
    const result$ = this.ordersService.send(
      'product_coupons.create',
      createProductCouponDto,
    );
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.ordersService.send('product_coupons.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':productid/:couponid')
  async findOne(
    @Param('productid') productid: number,
    @Param('couponid') couponid: number,
  ) {
    const result$ = this.ordersService.send('product_coupons.find_one', {
      couponid,
      productid,
    });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductCouponDto: UpdateProductCouponDto,
  ) {
    const result$ = this.ordersService.send('product_coupons.update', {
      id,
      updateProductCouponDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':productid/:couponid')
  async remove(
    @Param('productid') productid: number,
    @Param('couponid') couponid: number,
  ) {
    const result$ = this.ordersService.send('product_coupons.remove', {
      productid,
      couponid,
    });
    return await lastValueFrom(result$);
  }
}
