import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller()
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @MessagePattern('shops.create')
  async create(createShopDto: CreateShopDto) {
    return await this.shopsService.create(createShopDto);
  }

  @MessagePattern('shops.find_all')
  async findAll() {
    return await this.shopsService.findAll({});
  }

  @MessagePattern('shops.find_one')
  async findOne(payload: { id: string }) {
    return await this.shopsService.findOne({ shop_id: +payload.id });
  }

  @MessagePattern('shops.update')
  async update(payload: { id: string; updateShopDto: UpdateShopDto }) {
    return await this.shopsService.update({
      where: { shop_id: +payload.id },
      data: payload.updateShopDto,
    });
  }

  @MessagePattern('shops.remove')
  async remove(payload: { id: string }) {
    return await this.shopsService.remove({ shop_id: +payload.id });
  }
}