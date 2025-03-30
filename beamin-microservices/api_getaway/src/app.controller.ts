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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_NAME') private productService: ClientProxy,
    @Inject('USER_NAME') private userService: ClientProxy,
  ) {}

  /************************PRODUCTS**********************/
  @Get('/products')
  async findAll(
    @Query('searchTerm') searchTerm?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string, // JSON string from query
  ) {
    const products = await lastValueFrom(
      this.productService.send('products.find_all', { // Match the message topic
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
    return await lastValueFrom(
      this.productService.send('products.create', createProductDto),
    );
  }

  @Get('/products:id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(
      this.productService.send('products.find_one', { id }),
    );
  }

  @Patch('/products:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return await lastValueFrom(
      this.productService.send('products.update', { id, updateProductDto }),
    );
  }

  @Delete('/products:id')
  async remove(@Param('id') id: string) {
    return await lastValueFrom(
      this.productService.send('products.remove', { id }),
    );
  }

  /************************USERS**********************/
  @Post('/users/create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(this.userService.send('users.create', createUserDto));
  }

  @Get('/users')
  async findAllUsers() {
    return await lastValueFrom(this.userService.send('users.find_all', {}));
  }

  @Get('/users:id')
  async findOneUser(@Param('id') id: string) {
    return await lastValueFrom(this.userService.send('users.find_one', { id }));
  }

  @Patch('/users:id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await lastValueFrom(this.userService
      .send('users.update', { id, updateUserDto }));
  }

  @Delete('/users:id')
  async removeUser(@Param('id') id: string) {
    return await lastValueFrom(this.userService.send('users.remove', { id }));
  }

  /************************AUTH**********************/
  @Post('/auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await lastValueFrom(this.userService.send('auth.signup', createUserDto));
  }

  @Post('/auth/login')
  async login(@Body() payload: { username: string; password: string }) {
    return await lastValueFrom(this.userService.send('auth.login', payload));
  }
}
