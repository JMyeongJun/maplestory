import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { Model } from 'mongoose';
import { RequestRewardDto } from './dto/request-reward.dto';
import {
  RewardRequest,
  RewardRequestDocument,
} from '../schemas/reward-request.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(RewardRequest.name)
    private readonly rewardRequestModel: Model<RewardRequestDocument>,
  ) {}

  async createEvent(dto: CreateEventDto) {
    const exists = await this.eventModel.findOne({ title: dto.title });
    if (exists) {
      throw new ConflictException('중복된 이벤트 제목입니다.');
    }

    const event = new this.eventModel(dto);

    return event.save();
  }

  list() {
    return this.eventModel.find();
  }

  async requestReward(dto: RequestRewardDto) {
    const exists = await this.eventModel.findOne({
      _id: dto.eventId,
    });
    if (!exists) {
      throw new ConflictException('해당 이벤트를 찾지 못했습니다.');
    }

    if (exists.isActive) {
      throw new ConflictException('현재 이용가능한 이벤트가 아닙니다.');
    }

    // todo:: 보상 조건 로직 추가

    const rewardReq = new this.rewardRequestModel(dto);

    return rewardReq.save();
  }
}
