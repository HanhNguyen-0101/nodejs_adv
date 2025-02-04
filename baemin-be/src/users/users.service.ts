import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.usersWhereUniqueInput;
    where?: Prisma.usersWhereInput;
    orderBy?: Prisma.usersOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.users.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    userWhereUniqueInput: Prisma.usersWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.users.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(data: Prisma.usersCreateInput): Promise<User> {
    return this.prisma.users.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.usersWhereUniqueInput;
    data: Prisma.usersUpdateInput;
  }): Promise<User> {
    const { data, where } = params;
    return this.prisma.users.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.usersWhereUniqueInput): Promise<User> {
    return this.prisma.users.delete({
      where,
    });
  }

}
