import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagsService } from './messages.service';
import { MessagesRepository } from './messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [MessagsService, MessagesRepository],
})
export class MessagesModule {}
