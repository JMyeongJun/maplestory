import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { EventService } from './event.service';
import { RequestRewardDto } from './dto/request-reward.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() dto: CreateEventDto) {
    return this.eventService.createEvent(dto);
  }

  @Get('list')
  getList() {
    return this.eventService.list();
  }

  @Post('reward')
  requestReward(@Body() dto: RequestRewardDto) {
    return this.eventService.requestReward(dto);
  }
}
