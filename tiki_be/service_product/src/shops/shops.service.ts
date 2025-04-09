import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.shopsWhereUniqueInput;
    where?: Prisma.shopsWhereInput;
    orderBy?: Prisma.shopsOrderByWithRelationInput;
  }): Promise<Shop[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shops.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    shopWhereUniqueInput: Prisma.shopsWhereUniqueInput,
  ): Promise<Shop | null> {
    return this.prisma.shops.findUnique({
      where: shopWhereUniqueInput,
    });
  }

  async create(data: Prisma.shopsCreateInput): Promise<Shop> {
    return this.prisma.shops.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.shopsWhereUniqueInput;
    data: Prisma.shopsUpdateInput;
  }): Promise<Shop> {
    const { data, where } = params;
    return this.prisma.shops.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.shopsWhereUniqueInput): Promise<Shop> {
    return this.prisma.shops.delete({
      where,
    });
  }
}
