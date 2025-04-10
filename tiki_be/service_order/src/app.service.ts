import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { OrderItemsService } from './order_items/order_items.service';
import { ClientProxy } from '@nestjs/microservices';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from './entities/user.entity';
import { CreateOrderItemDto } from './order_items/dto/create-order_item.dto';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject(process.env.SERVICE_SHIPPING_NAME) private shippingService: ClientProxy,
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
        shippings: true,
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
                shops: true,
                product_coupons: true,
                product_tags: true,
              }
            },
          }
        },
        shippings: true,
      },
    }) as Promise<Order | null>;
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const order = await this.prisma.orders.create({
      data,
      include: {
        users: true,
        order_items: true,
        shippings: true,
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
        shippings: true,
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
        shippings: true,
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
    shippings: CreateShippingDto;
    totalamount: number;
  }): Promise<any> {
    const order = await this.create({
      totalamount: createPayment.totalamount,
      userid: createPayment.users.userid,
    });

    const orderItemsPromises = createPayment.order_items.map((i) =>
      this.orderItemsService.create({
        productid: i.productid,
        quantity: i.quantity,
        price: i.price,
        orderid: order.orderid,
      }),
    );
    await Promise.all(orderItemsPromises);

    const result$ = this.shippingService.send('shipping.create', {
      orderid: order.orderid,
      address: createPayment.shippings.address,
      shippingmethod: createPayment.shippings.shippingmethod,
      cost: createPayment.shippings.cost,
      deliveredat: createPayment.shippings.deliveredat,
    });
    await lastValueFrom(result$);

    return await this.findOne({
      orderid: order.orderid,
    });
  }
}
