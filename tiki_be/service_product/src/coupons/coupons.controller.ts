import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';

@Controller()
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @MessagePattern('coupons.create')
  async create(createCouponDto: CreateCouponDto) {
    return await this.couponsService.create(createCouponDto);
  }

  @MessagePattern('coupons.find_all')
  async findAll() {
    return await this.couponsService.findAll({});
  }

  @MessagePattern('coupons.find_one')
  async findOne(payload: { id: number }) {
    return await this.couponsService.findOne({ couponid: +payload.id });
  }

  @MessagePattern('coupons.update')
  async update(payload: { id: number; updateCouponDto: UpdateCouponDto }) {
    return await this.couponsService.update({
      where: { couponid: +payload.id },
      data: payload.updateCouponDto,
    });
  }

  @MessagePattern('coupons.remove')
  async remove(payload: { id: number }) {
    return await this.couponsService.remove({ couponid: +payload.id });
  }
}
