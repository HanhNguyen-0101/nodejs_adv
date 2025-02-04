import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  
  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.productsWhereUniqueInput;
    where?: Prisma.productsWhereInput;
    orderBy?: Prisma.productsOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const products = await this.prisma.products.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        categories: true,
        shops: true
      }
    });
    return products as unknown as Product[];
  }

  async findOne(
    productWhereUniqueInput: Prisma.productsWhereUniqueInput,
  ): Promise<Product | null> {
    return this.prisma.products.findUnique({
      where: productWhereUniqueInput,
      include: {
        categories: true,
        shops: true
      }
    }) as Promise<Product | null>;
  }

  async create(data: Prisma.productsCreateInput): Promise<Product> {
    const product = await this.prisma.products.create({
      data,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }

    return product as unknown as Product;
  }

  async update(params: {
    where: Prisma.productsWhereUniqueInput;
    data: Prisma.productsUpdateInput;
  }): Promise<Product> {
    const { data, where } = params;
    const product = await this.prisma.products.update({
      data,
      where,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }

    return product as unknown as Product;
  }

  async remove(where: Prisma.productsWhereUniqueInput): Promise<Product> {
    const product = await this.prisma.products.delete({
      where,
      include: {
        shops: true,
        categories: true
      }
    });

    if (!product.shops) {
      throw new Error('Shop property is missing in the product.');
    }

    if (!product.categories) {
      throw new Error('Category property is missing in the product.');
    }

    return product as unknown as Product;
  }
}
