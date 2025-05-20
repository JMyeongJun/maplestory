import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { RequestRewardDto } from './dto/request-reward.dto';
import { RewardApproveDto } from './dto/reward-approve.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  @Get()
  getList() {
    return this.eventService.list();
  }

  @Post('reward/request')
  requestReward(@Body() dto: RequestRewardDto) {
    return this.eventService.requestReward(dto);
  }

  @Get('reward/request')
  getRequestedRewardList(@Query('userId') userId: string) {
    return this.eventService.getRequestedRewardList(userId);
  }

  @Post('reward/request/approve')
  rewardApprove(@Body() dto: RewardApproveDto) {
    return this.eventService.rewardApprove(dto);
  }
}
