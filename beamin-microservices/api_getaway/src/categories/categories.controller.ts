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
import { CreateCategoryDto } from './dto/create-category.dto';
import { lastValueFrom } from 'rxjs';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result$ = this.productService.send('categories.create', createCategoryDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.productService.send('categories.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result$ = this.productService.send('categories.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result$ = this.productService.send('categories.update', { id, updateCategoryDto });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result$ = this.productService.send('categories.remove', { id });
    return await lastValueFrom(result$);
  }
}
