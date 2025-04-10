import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Shipping } from './entities/shipping.entity';
import { CreateShippingDto } from './dto/create-shipping.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.shippingWhereUniqueInput;
    where?: Prisma.shippingWhereInput;
    orderBy?: Prisma.shippingOrderByWithRelationInput;
  }): Promise<Shipping[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const shippings = await this.prisma.shipping.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        orders: true
      }
    });
    return shippings as unknown as Shipping[];
  }

  async findOne(
    shopWhereUniqueInput: Prisma.shippingWhereUniqueInput,
  ): Promise<Shipping | null> {
    return this.prisma.shipping.findUnique({
      where: shopWhereUniqueInput,
      include: {
        orders: true,
      },
    }) as Promise<Shipping | null>;
  }

  async create(data: CreateShippingDto): Promise<Shipping> {
    const shipping = await this.prisma.shipping.create({
      data,
      include: {
        orders: true,
      },
    });

    if (!shipping.orders) {
      throw new Error('Order property is missing in the shipping.');
    }

    return shipping as unknown as Shipping;
  }

  async update(params: {
    where: Prisma.shippingWhereUniqueInput;
    data: Prisma.shippingUpdateInput;
  }): Promise<Shipping> {
    const { data, where } = params;
    const shipping = await this.prisma.shipping.update({
      data,
      where,
      include: {
        orders: true,
      },
    });

    if (!shipping.orders) {
      throw new Error('Order property is missing in the shipping.');
    }

    return shipping as unknown as Shipping;
  }

  async remove(where: Prisma.shippingWhereUniqueInput): Promise<Shipping> {
    const shipping = await this.prisma.shipping.delete({
      where,
      include: {
        orders: true,
      },
    });

    if (!shipping.orders) {
      throw new Error('Order property is missing in the shipping.');
    }

    return shipping as unknown as Shipping;
  }
}
