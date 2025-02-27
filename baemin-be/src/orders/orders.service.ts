import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateShippingDto } from 'src/shipping/dto/create-shipping.dto';
import { CreateOrderItemDto } from 'src/order_items/dto/create-order_item.dto';
import { ShippingService } from 'src/shipping/shipping.service';
import { OrderItemsService } from 'src/order_items/order_items.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private shippingService: ShippingService,
    private orderItemsService: OrderItemsService,
  ) {}

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
      },
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
        order_items: {
          include: {
            products: {
              include: {
                categories: true,
                shops: true
              }
            },
          }
        },
        shipping: true,
      },
    }) as Promise<Order | null>;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order = await this.prisma.orders.create({
      data,
      include: {
        users: true,
        order_items: true,
        shipping: true,
      },
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
      },
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
      },
    });

    if (!order.users) {
      throw new Error('User property is missing in the order.');
    }

    return order as unknown as Order;
  }

  async makepayment(createPayment: {
    users: User;
    order_items: CreateOrderItemDto[];
    shipping: CreateShippingDto;
    total: number;
  }): Promise<any> {
    const order = await this.create({
      total: createPayment.total,
      user_id: createPayment.users.user_id,
    });

    const orderItemsPromises = createPayment.order_items.map((i) =>
      this.orderItemsService.create({
        product_id: i.product_id,
        quantity: i.quantity,
        price: i.price,
        order_id: order.order_id,
      }),
    );
    await Promise.all(orderItemsPromises);

    await this.shippingService.create({
      order_id: order.order_id,
      address: createPayment.shipping.address,
      city: createPayment.shipping.city,
      state: createPayment.shipping.state,
      postal_code: createPayment.shipping.postal_code,
      country: createPayment.shipping.country,
      shipping_method: createPayment.shipping.shipping_method,
    });

    return await this.findOne({
      order_id: order.order_id,
    });
  }
}
