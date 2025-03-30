import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @MessagePattern('categories.create')
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto);
  }

  @MessagePattern('categories.find_all')
  async findAll() {
    return await this.categoriesService.findAll({});
  }

  @MessagePattern('categories.find_one')
  async findOne(payload: { id: string }) {
    return await this.categoriesService.findOne({ category_id: +payload.id });
  }

  @MessagePattern('categories.update')
  async update(payload: { id: string; updateCategoryDto: UpdateCategoryDto }) {
    return await this.categoriesService.update({
      where: { category_id: +payload.id },
      data: payload.updateCategoryDto,
    });
  }

  @MessagePattern('categories.remove')
  async remove(payload: { id: string }) {
    return await this.categoriesService.remove({ category_id: +payload.id });
  }
}