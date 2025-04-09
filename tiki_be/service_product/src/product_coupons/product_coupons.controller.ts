import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductCouponsService } from './product_coupons.service';
import { CreateProductCouponDto } from './dto/create-product_coupon.dto';
import { UpdateProductCouponDto } from './dto/update-product_coupon.dto';

@Controller()
export class ProductCouponsController {
  constructor(private readonly productCouponsService: ProductCouponsService) {}

  @MessagePattern('product_coupons.create')
  async create(createProductCouponDto: CreateProductCouponDto) {
    return await this.productCouponsService.create(createProductCouponDto);
  }

  @MessagePattern('product_coupons.find_all')
  async findAll() {
    return await this.productCouponsService.findAll({});
  }

  @MessagePattern('product_coupons.find_one')
  async findOne(payload: { productid: number; couponid: number }) {
    return await this.productCouponsService.findOne({
      productid_couponid: {
        productid: +payload.productid,
        couponid: +payload.couponid,
      },
    });
  }

  @MessagePattern('product_coupons.update')
  async update(payload: {
    id: number;
    updateProductCouponDto: UpdateProductCouponDto;
  }) {
    const { id, updateProductCouponDto } = payload;
    const where = {
      productid_couponid: {
        productid: +id,
        couponid: +updateProductCouponDto.coupons.connect.couponid,
      },
    }; // Compound key
    return await this.productCouponsService.update(
      where,
      updateProductCouponDto,
    );
  }

  @MessagePattern('product_coupons.remove')
  async remove(payload: { productid: number; couponid: number }) {
    return await this.productCouponsService.remove({
      productid_couponid: {
        productid: +payload.productid,
        couponid: +payload.couponid,
      },
    });
  }
}
