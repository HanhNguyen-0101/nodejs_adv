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
import { CreateProductTagDto } from './dto/create-product_tag.dto';
import { UpdateProductTagDto } from './dto/update-product_tag.dto';

@Controller('product-tags')
export class ProductTagsController {
  constructor(@Inject('PRODUCT_NAME') private ordersService: ClientProxy) {}

  @Post()
  async create(@Body() createProductTagDto: CreateProductTagDto) {
    const result$ = this.ordersService.send(
      'product_tags.create',
      createProductTagDto,
    );
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.ordersService.send('product_tags.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':productid/:tagid')
  async findOne(
    @Param('productid') productid: number,
    @Param('tagid') tagid: number,
  ) {
    const result$ = this.ordersService.send('product_tags.find_one', {
      productid,
      tagid,
    });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductTagDto: UpdateProductTagDto,
  ) {
    const result$ = this.ordersService.send('product_tags.update', {
      id,
      updateProductTagDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':productid/:tagid')
  async remove(
    @Param('productid') productid: number,
    @Param('tagid') tagid: number,
  ) {
    const result$ = this.ordersService.send('product_tags.remove', {
      productid,
      tagid,
    });
    return await lastValueFrom(result$);
  }
}
