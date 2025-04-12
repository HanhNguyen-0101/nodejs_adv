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
    cursor?: Prisma.shippingsWhereUniqueInput;
    where?: Prisma.shippingsWhereInput;
    orderBy?: Prisma.shippingsOrderByWithRelationInput;
  }): Promise<Shipping[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const shippings = await this.prisma.shippings.findMany({
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
    shopWhereUniqueInput: Prisma.shippingsWhereUniqueInput,
  ): Promise<Shipping | null> {
    return this.prisma.shippings.findUnique({
      where: shopWhereUniqueInput,
      include: {
        orders: true,
      },
    }) as Promise<Shipping | null>;
  }

  async create(data: CreateShippingDto): Promise<Shipping> {
    const shipping = await this.prisma.shippings.create({
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
    where: Prisma.shippingsWhereUniqueInput;
    data: Prisma.shippingsUpdateInput;
  }): Promise<Shipping> {
    const { data, where } = params;
    const shipping = await this.prisma.shippings.update({
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

  async remove(where: Prisma.shippingsWhereUniqueInput): Promise<Shipping> {
    const shipping = await this.prisma.shippings.delete({
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
