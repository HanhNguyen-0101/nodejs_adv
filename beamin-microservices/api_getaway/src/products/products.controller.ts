import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @Get()
  async findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string, // JSON string from query
  ) {
    const products = await lastValueFrom(
      this.productService.send('products.find_all', {
        // Match the message topic
        searchTerm,
        skip,
        take,
        orderBy,
      }),
    );

    return products;
  }

  @Get('/search')
  async search(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    const products = await lastValueFrom(
      this.productService.send('products.search', {
        searchTerm,
        skip,
        take,
      }),
    );

    return products;
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await lastValueFrom(
      this.productService.send('products.create', createProductDto),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.productService.send('products.find_one', { id }),
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await lastValueFrom(
      this.productService.send('products.update', { id, updateProductDto }),
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await lastValueFrom(
      this.productService.send('products.remove', { id }),
    );
  }
}
