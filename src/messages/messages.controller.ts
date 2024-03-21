import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagsService } from './messages.service';

@Controller('messages')
export class MessagesController {
  MessagsService: MessagsService;
  constructor() {
    // 비권장 방식
    this.MessagsService = new MessagsService();
  }

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
  getMessage(@Param('id') id: string) {
    return this.MessagsService.findOne(id);
  }
}
