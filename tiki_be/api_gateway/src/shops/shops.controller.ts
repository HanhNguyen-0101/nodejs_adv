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
import { UpdateShopDto } from './dto/update-shop.dto';
import { CreateShopDto } from './dto/create-shop.dto';
  
@Controller('shops')
export class ShopsController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    const result$ = this.productService.send('shops.create', createShopDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.productService.send('shops.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result$ = this.productService.send('shops.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    const result$ = this.productService.send('shops.update', { id, updateShopDto });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result$ = this.productService.send('shops.remove', { id });
    return await lastValueFrom(result$);
  }
}
