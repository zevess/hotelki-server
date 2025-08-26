import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { EventModule } from 'src/event/event.module';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [EventModule],
  controllers: [FriendController],
  providers: [FriendService, EventService],
})
export class FriendModule {}
