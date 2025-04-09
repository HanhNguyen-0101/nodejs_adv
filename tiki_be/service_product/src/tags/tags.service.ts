import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.tagsWhereUniqueInput;
    where?: Prisma.tagsWhereInput;
    orderBy?: Prisma.tagsOrderByWithRelationInput;
  }): Promise<Tag[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.tags.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne(
    tagWhereUniqueInput: Prisma.tagsWhereUniqueInput,
  ): Promise<Tag | null> {
    return this.prisma.tags.findUnique({
      where: tagWhereUniqueInput,
    });
  }

  async create(data: Prisma.tagsCreateInput): Promise<Tag> {
    return this.prisma.tags.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.tagsWhereUniqueInput;
    data: Prisma.tagsUpdateInput;
  }): Promise<Tag> {
    const { data, where } = params;
    return this.prisma.tags.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.tagsWhereUniqueInput): Promise<Tag> {
    return this.prisma.tags.delete({
      where,
    });
  }
}
