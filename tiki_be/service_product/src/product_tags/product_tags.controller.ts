import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductTagsService } from './product_tags.service';
import { CreateProductTagDto } from './dto/create-product_tag.dto';
import { UpdateProductTagDto } from './dto/update-product_tag.dto';

@Controller()
export class ProductTagsController {
  constructor(private readonly productTagsService: ProductTagsService) {}

  @MessagePattern('product_tags.create')
  async create(createProductTagDto: CreateProductTagDto) {
    return await this.productTagsService.create(createProductTagDto);
  }

  @MessagePattern('product_tags.find_all')
  async findAll() {
    return await this.productTagsService.findAll({});
  }

  @MessagePattern('product_tags.find_one')
  async findOne(payload: { productid: number; tagid: number }) {
    return await this.productTagsService.findOne({
      productid_tagid: {
        productid: +payload.productid,
        tagid: +payload.tagid,
      },
    });
  }

  @MessagePattern('product_tags.update')
  async update(payload: {
    id: number;
    updateProductTagDto: UpdateProductTagDto;
  }) {
    const { id, updateProductTagDto } = payload;
    const where = {
      productid_tagid: {
        productid: +id,
        tagid: +updateProductTagDto.tags.connect.tagid,
      },
    }; // Compound key
    return await this.productTagsService.update(where, updateProductTagDto);
  }

  @MessagePattern('product_tags.remove')
  async remove(payload: { productid: number; tagid: number }) {
    return await this.productTagsService.remove({
      productid_tagid: {
        productid: +payload.productid,
        tagid: +payload.tagid,
      },
    });
  }
}
