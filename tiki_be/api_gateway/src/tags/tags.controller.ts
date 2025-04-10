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
import { UpdateTagDto } from './dto/update-tag.dto';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(@Inject('PRODUCT_NAME') private productService: ClientProxy) {}

  @Post()
  async create(@Body() createTagDto: CreateTagDto) {
    const result$ = this.productService.send('tags.create', createTagDto);
    return await lastValueFrom(result$);
  }

  @Get()
  async findAll() {
    const result$ = this.productService.send('tags.find_all', {});
    return await lastValueFrom(result$);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result$ = this.productService.send('tags.find_one', { id });
    return await lastValueFrom(result$);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateTagDto: UpdateTagDto) {
    const result$ = this.productService.send('tags.update', {
      id,
      updateTagDto,
    });
    return await lastValueFrom(result$);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const result$ = this.productService.send('tags.remove', { id });
    return await lastValueFrom(result$);
  }
}
