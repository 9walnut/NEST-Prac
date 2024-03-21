import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagsService } from './messages.service';

@Controller('messages')
export class MessagesController {
  MessagsService: MessagsService;
  constructor(public messageService: MessagsService) {}

  @Get()
  listMessages() {
    return this.MessagsService.findAll();
  }

  // 타입 정보가 js에도 존재?
  @Post()
  createMessages(@Body() body: CreateMessageDto) {
    return this.MessagsService.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.MessagsService.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
