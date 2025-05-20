import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRewardDto } from './dto/create-reward.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from '../schemas/reward.schema';
import { Event, EventDocument } from '../schemas/event.schema';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name)
    private readonly rewardModel: Model<RewardDocument>,
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>,
  ) {}

  async createReward(dto: CreateRewardDto) {
    const exists = await this.eventModel.findOne({ _id: dto.eventId });
    if (!exists) {
      throw new ConflictException('존재하지 않는 이벤트입니다.');
    }

    const reward = new this.rewardModel(dto);

    return reward.save();
  }

  list() {
    return this.rewardModel.find();
  }
}
