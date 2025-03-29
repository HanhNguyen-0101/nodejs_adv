import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne({ product_id: +id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update({
      where: { product_id: +id },
      data: updateProductDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove({ product_id: +id });
  }

  @Get()
  findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: string, // Use string to match query param type
    @Query('take') take?: string, // Use string to match query param type
    @Query('orderBy') orderBy?: string, // JSON string from query
  ) {
    let orderByParsed;

    // Safely parse orderBy if provided
    if (orderBy) {
      try {
        orderByParsed = JSON.parse(orderBy);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format for orderBy');
      }
    }

    return this.productsService.findAll({
      searchTerm,
      skip: skip ? Number(skip) : undefined, // Convert skip to number
      take: take ? Number(take) : undefined, // Convert take to number
      orderBy: orderByParsed,
    });
  }

}
