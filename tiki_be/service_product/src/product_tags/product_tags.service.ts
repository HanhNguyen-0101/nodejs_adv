/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductTags } from './entities/product_tag.entity';
import { CreateProductTagDto } from './dto/create-product_tag.dto';
import { UpdateProductTagDto } from './dto/update-product_tag.dto';

@Injectable()
export class ProductTagsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.product_tagsWhereUniqueInput;
    where?: Prisma.product_tagsWhereInput;
    orderBy?: Prisma.product_tagsOrderByWithRelationInput;
  }): Promise<ProductTags[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const productTags = await this.prisma.product_tags.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        tags: true,
        products: true,
      },
    });
    return productTags as unknown as ProductTags[];
  }

  async findOne(
    product_tagWhereUniqueInput: Prisma.product_tagsWhereUniqueInput,
  ): Promise<ProductTags | null> {
    return this.prisma.product_tags.findUnique({
      where: product_tagWhereUniqueInput,
      include: {
        tags: true,
        products: true,
      },
    }) as Promise<ProductTags | null>;
  }

  async create(data: CreateProductTagDto): Promise<ProductTags> {
    const productTag = await this.prisma.product_tags.create({
      data,
      include: {
        tags: true,
        products: true,
      },
    });

    if (!productTag.tags) {
      throw new Error('Tag property is missing in the tag item.');
    }

    if (!productTag.products) {
      throw new Error('Product property is missing in the tag item.');
    }

    return productTag as unknown as ProductTags;
  }

  async update(
    where: Prisma.product_tagsWhereUniqueInput,
    updateProductTagDto: UpdateProductTagDto,
  ) {
    const data: Prisma.product_tagsUpdateInput = {
      products: updateProductTagDto.products,
      tags: updateProductTagDto.tags,
    };

    const productTag = await this.prisma.product_tags.update({
      data,
      where,
      include: {
        tags: true,
        products: true,
      },
    });

    if (!productTag.tags) {
      throw new Error('Tag property is missing in the tag item.');
    }

    if (!productTag.products) {
      throw new Error('Product property is missing in the tag item.');
    }

    return productTag as unknown as ProductTags;
  }

  async remove(
    where: Prisma.product_tagsWhereUniqueInput,
  ): Promise<ProductTags> {
    const productTag = await this.prisma.product_tags.delete({
      where,
      include: {
        tags: true,
        products: true,
      },
    });

    if (!productTag.tags) {
      throw new Error('Tag property is missing in the tag item.');
    }

    if (!productTag.products) {
      throw new Error('Product property is missing in the tag item.');
    }

    return productTag as unknown as ProductTags;
  }
}
