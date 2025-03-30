import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.categoriesWhereUniqueInput;
    where?: Prisma.categoriesWhereInput;
    orderBy?: Prisma.categoriesOrderByWithRelationInput;
  }): Promise<Category[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.categories.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    categoryWhereUniqueInput: Prisma.categoriesWhereUniqueInput,
  ): Promise<Category | null> {
    return this.prisma.categories.findUnique({
      where: categoryWhereUniqueInput,
    });
  }

  async create(data: Prisma.categoriesCreateInput): Promise<Category> {
    return this.prisma.categories.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.categoriesWhereUniqueInput;
    data: Prisma.categoriesUpdateInput;
  }): Promise<Category> {
    const { data, where } = params;
    return this.prisma.categories.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.categoriesWhereUniqueInput): Promise<Category> {
    return this.prisma.categories.delete({
      where,
    });
  }
}
