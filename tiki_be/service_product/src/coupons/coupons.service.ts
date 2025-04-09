import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.couponsWhereUniqueInput;
    where?: Prisma.couponsWhereInput;
    orderBy?: Prisma.couponsOrderByWithRelationInput;
  }): Promise<Coupon[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.coupons.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    couponWhereUniqueInput: Prisma.couponsWhereUniqueInput,
  ): Promise<Coupon | null> {
    return this.prisma.coupons.findUnique({
      where: couponWhereUniqueInput,
    });
  }

  async create(data: Prisma.couponsCreateInput): Promise<Coupon> {
    return this.prisma.coupons.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.couponsWhereUniqueInput;
    data: Prisma.couponsUpdateInput;
  }): Promise<Coupon> {
    const { data, where } = params;
    return this.prisma.coupons.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.couponsWhereUniqueInput): Promise<Coupon> {
    return this.prisma.coupons.delete({
      where,
    });
  }
}
