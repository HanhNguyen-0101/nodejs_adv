import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ordersWhereUniqueInput;
    where?: Prisma.ordersWhereInput;
    orderBy?: Prisma.ordersOrderByWithRelationInput;
  }): Promise<Order[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const orders = await this.prisma.orders.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      }
    });
    return orders as unknown as Order[];
  }

  async findOne(
    orderWhereUniqueInput: Prisma.ordersWhereUniqueInput,
  ): Promise<Order | null> {
    return this.prisma.orders.findUnique({
      where: orderWhereUniqueInput,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      }
    }) as Promise<Order | null>;
  }

  async create(data: Prisma.ordersCreateInput): Promise<Order> {
    const order = await this.prisma.orders.create({
      data,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      }
    });

    if (!order.users) {
      throw new Error('User property is missing in the order.');
    }

    return order as unknown as Order;
  }

  async update(params: {
    where: Prisma.ordersWhereUniqueInput;
    data: Prisma.ordersUpdateInput;
  }): Promise<Order> {
    const { data, where } = params;
    const order = await this.prisma.orders.update({
      data,
      where,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      }
    });

    if (!order.users) {
      throw new Error('User property is missing in the order.');
    }

    return order as unknown as Order;
  }

  async remove(where: Prisma.ordersWhereUniqueInput): Promise<Order> {
    const order = await this.prisma.orders.delete({
      where,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      }
    });

    if (!order.users) {
      throw new Error('User property is missing in the order.');
    }

    return order as unknown as Order;
  }
}
