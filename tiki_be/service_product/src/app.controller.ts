/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BadRequestException, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SearchService } from './search/search.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly searchService: SearchService,
  ) {}

  @MessagePattern('products.search')
  async search(payload: { searchTerm: string; skip?: number; take?: number }) {
    const { searchTerm, skip, take } = payload;
    const results = await this.searchService.searchProducts(
      searchTerm,
      skip,
      take,
    );
    return results; // Return matched products
  }

  @MessagePattern('products.find_all')
  findAll(
    @Payload()
    payload: {
      searchTerm?: string;
      skip?: string;
      take?: string;
      orderBy?: string;
      where?: string;
      relate?: string;
    },
  ) {
    const { searchTerm, skip, take, orderBy, where, relate } = payload;
    let orderByParsed, whereParsed, relateParsed;

    // Safely parse orderBy if provided
    if (orderBy) {
      try {
        orderByParsed = JSON.parse(orderBy);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format for orderBy');
      }
    }

    if (where) {
      try {
        whereParsed = JSON.parse(where);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format for where');
      }
    }
    if (relate) {
      try {
        relateParsed = JSON.parse(relate);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format for where');
      }
    }

    return this.appService.findAll({
      searchTerm,
      where: whereParsed,
      skip: skip ? Number(skip) : undefined, // Convert skip to number
      take: take ? Number(take) : undefined, // Convert take to number
      orderBy: orderByParsed,
      relate: relateParsed,
    });
  }

  @MessagePattern('products.create')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @MessagePattern('products.find_one')
  findOne(@Payload() payload: { id: number }) {
    return this.appService.findOne({ productid: +payload.id });
  }

  @MessagePattern('products.update')
  update(
    @Payload() payload: { id: number; updateProductDto: UpdateProductDto },
  ) {
    return this.appService.update({
      where: { productid: +payload.id },
      data: payload.updateProductDto,
    });
  }

  @MessagePattern('products.remove')
  remove(@Payload() payload: { id: number }) {
    return this.appService.remove({ productid: +payload.id });
  }
}
