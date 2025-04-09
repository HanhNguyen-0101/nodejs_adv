import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @MessagePattern('tags.create')
  async create(createTagDto: CreateTagDto) {
    return await this.tagsService.create(createTagDto);
  }

  @MessagePattern('tags.find_all')
  async findAll() {
    return await this.tagsService.findAll({});
  }

  @MessagePattern('tags.find_one')
  async findOne(payload: { id: number }) {
    return await this.tagsService.findOne({ tagid: +payload.id });
  }

  @MessagePattern('tags.update')
  async update(payload: { id: number; updateTagDto: UpdateTagDto }) {
    return await this.tagsService.update({
      where: { tagid: +payload.id },
      data: payload.updateTagDto,
    });
  }

  @MessagePattern('tags.remove')
  async remove(payload: { id: number }) {
    return await this.tagsService.remove({ tagid: +payload.id });
  }
}
