import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { RewardService } from './reward.service';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  createReward(@Body() dto: CreateRewardDto) {
    return this.rewardService.createReward(dto);
  }

  @Get()
  getList() {
    return this.rewardService.list();
  }
}
