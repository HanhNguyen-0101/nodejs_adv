import { BadRequestException, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @EventPattern("save_ship")
  // async saveShipping(@Payload() data) {

  //   let { orderId, email, firstName, lastName, address } = data;

  //   let infoShip = {
  //     order_id: orderId,
  //     email,
  //     first_name: firstName,
  //     last_name: lastName,
  //     address
  //   }
  //   await this.prismaService.shipping.create({ data: infoShip });

  //   // gọi service notify xử lý gửi mail thành công
  //   this.notifyService.emit("send_mail_success", { email: email });
  // }

  @MessagePattern('find_all_product')
  findAll(
    @Payload()
    payload: {
      searchTerm?: string,
      skip?: string,
      take?: string, 
      orderBy?: string
  }) {
    const { searchTerm, skip, take, orderBy } = payload;
    let orderByParsed;

    // Safely parse orderBy if provided
    if (orderBy) {
      try {
        orderByParsed = JSON.parse(orderBy);
      } catch (e) {
        throw new BadRequestException('Invalid JSON format for orderBy');
      }
    }

    return this.appService.findAll({
      searchTerm,
      skip: skip ? Number(skip) : undefined, // Convert skip to number
      take: take ? Number(take) : undefined, // Convert take to number
      orderBy: orderByParsed,
    });
  }

  @MessagePattern('create_product')
  create(@Payload() createProductDto: CreateProductDto) {
    return this.appService.create(createProductDto);
  }

  @MessagePattern('find_product')
  findOne(@Payload() payload: { id: string }) {
    return this.appService.findOne({ product_id: +payload.id });
  }

  @MessagePattern('update_product')
  update(
    @Payload() payload: { id: string; updateProductDto: UpdateProductDto },
  ) {
    return this.appService.update({
      where: { product_id: +payload.id },
      data: payload.updateProductDto,
    });
  }

  @MessagePattern('remove_product')
  remove(@Payload() payload: { id: string }) {
    return this.appService.remove({ product_id: +payload.id });
  }
}


