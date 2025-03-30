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
import { AppService } from './app.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_NAME') private productService: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/products')
  async findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string, // JSON string from query
  ) {
    const products = await lastValueFrom(
      this.productService.send('find_all_product', { // Match the message topic
        searchTerm,
        skip,
        take,
        orderBy,
      }),
    );

    return products;
  }

  @Post('/products')
  async create(@Body() createProductDto: CreateProductDto) {
    // Send a message to the microservice
    return await lastValueFrom(
      this.productService.send('create_product', createProductDto),
    );
  }

  @Get('/products:id')
  async findOne(@Param('id') id: string) {
    // Send a message to the microservice
    return await lastValueFrom(
      this.productService.send('find_product', { id }),
    );
  }

  @Patch('/products:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    // Send a message to the microservice
    return await lastValueFrom(
      this.productService.send('update_product', { id, updateProductDto }),
    );
  }

  @Delete('/products:id')
  async remove(@Param('id') id: string) {
    // Send a message to the microservice
    return await lastValueFrom(
      this.productService.send('remove_product', { id }),
    );
  }
}
