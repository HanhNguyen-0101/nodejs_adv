import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderItem } from './entities/order_item.entity';
import { CreateOrderItemDto } from './dto/create-order_item.dto';

@Injectable()
export class OrderItemsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.order_itemsWhereUniqueInput;
    where?: Prisma.order_itemsWhereInput;
    orderBy?: Prisma.order_itemsOrderByWithRelationInput;
  }): Promise<OrderItem[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const orderItems = await this.prisma.order_items.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        orders: true,
        products: true
      }
    });
    return orderItems as unknown as OrderItem[];
  }

  async findOne(
    order_itemWhereUniqueInput: Prisma.order_itemsWhereUniqueInput,
  ): Promise<OrderItem | null> {
    return this.prisma.order_items.findUnique({
      where: order_itemWhereUniqueInput,
      include: {
        orders: true,
        products: true
      }
    }) as Promise<OrderItem | null>;
  }

  async create(data: CreateOrderItemDto): Promise<OrderItem> {
    const orderItem = await this.prisma.order_items.create({
      data,
      include: {
        orders: true,
        products: true
      }
    });

    if (!orderItem.orders) {
      throw new Error('Order property is missing in the order item.');
    }

    if (!orderItem.products) {
      throw new Error('Product property is missing in the order item.');
    }

    return orderItem as unknown as OrderItem;
  }

  async update(params: {
    where: Prisma.order_itemsWhereUniqueInput;
    data: Prisma.order_itemsUpdateInput;
  }): Promise<OrderItem> {
    const { data, where } = params;
    const orderItem = await this.prisma.order_items.update({
      data,
      where,
      include: {
        orders: true,
        products: true
      }
    });

    if (!orderItem.orders) {
      throw new Error('Order property is missing in the order item.');
    }

    if (!orderItem.products) {
      throw new Error('Product property is missing in the order item.');
    }

    return orderItem as unknown as OrderItem;
  }

  async remove(where: Prisma.order_itemsWhereUniqueInput): Promise<OrderItem> {
    const orderItem = await this.prisma.order_items.delete({
      where,
      include: {
        orders: true,
        products: true
      }
    });

    if (!orderItem.orders) {
      throw new Error('Order property is missing in the order item.');
    }

    if (!orderItem.products) {
      throw new Error('Product property is missing in the order item.');
    }

    return orderItem as unknown as OrderItem;
  }
}
