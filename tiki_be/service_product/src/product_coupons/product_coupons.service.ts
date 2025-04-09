/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductCoupons } from './entities/product_coupon.entity';
import { CreateProductCouponDto } from './dto/create-product_coupon.dto';
import { UpdateProductCouponDto } from './dto/update-product_coupon.dto';

@Injectable()
export class ProductCouponsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.product_couponsWhereUniqueInput;
    where?: Prisma.product_couponsWhereInput;
    orderBy?: Prisma.product_couponsOrderByWithRelationInput;
  }): Promise<ProductCoupons[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const productCoupons = await this.prisma.product_coupons.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        coupons: true,
        products: true,
      },
    });
    return productCoupons as unknown as ProductCoupons[];
  }

  async findOne(
    product_couponWhereUniqueInput: Prisma.product_couponsWhereUniqueInput,
  ): Promise<ProductCoupons | null> {
    return this.prisma.product_coupons.findUnique({
      where: product_couponWhereUniqueInput,
      include: {
        coupons: true,
        products: true,
      },
    }) as Promise<ProductCoupons | null>;
  }

  async create(data: CreateProductCouponDto): Promise<ProductCoupons> {
    const productCoupon = await this.prisma.product_coupons.create({
      data,
      include: {
        coupons: true,
        products: true,
      },
    });

    if (!productCoupon.coupons) {
      throw new Error('Coupon property is missing in the coupon item.');
    }

    if (!productCoupon.products) {
      throw new Error('Product property is missing in the coupon item.');
    }

    return productCoupon as unknown as ProductCoupons;
  }

  async update(
    where: Prisma.product_couponsWhereUniqueInput,
    updateProductCouponDto: UpdateProductCouponDto,
  ) {
    const data: Prisma.product_couponsUpdateInput = {
      products: updateProductCouponDto.products,
      coupons: updateProductCouponDto.coupons,
    };

    const productCoupon = await this.prisma.product_coupons.update({
      data,
      where,
      include: {
        coupons: true,
        products: true,
      },
    });

    if (!productCoupon.coupons) {
      throw new Error('Coupon property is missing in the coupon item.');
    }

    if (!productCoupon.products) {
      throw new Error('Product property is missing in the coupon item.');
    }

    return productCoupon as unknown as ProductCoupons;
  }

  async remove(
    where: Prisma.product_couponsWhereUniqueInput,
  ): Promise<ProductCoupons> {
    const productCoupon = await this.prisma.product_coupons.delete({
      where,
      include: {
        coupons: true,
        products: true,
      },
    });

    if (!productCoupon.coupons) {
      throw new Error('Coupon property is missing in the coupon item.');
    }

    if (!productCoupon.products) {
      throw new Error('Product property is missing in the coupon item.');
    }

    return productCoupon as unknown as ProductCoupons;
  }
}
