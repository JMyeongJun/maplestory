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
import { RewardRequestStatus } from '@app/common/enums/reward-request-status.enum';

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
    const rewardReq = new this.rewardRequestModel(dto);
    rewardReq.status = RewardRequestStatus.FAILED;
    const exists = await this.eventModel.findOne({
      _id: dto.eventId,
    });
    if (!exists) {
      await rewardReq.save();
      throw new ConflictException('해당 이벤트를 찾지 못했습니다.');
    }

    if (exists.isActive) {
      await rewardReq.save();
      throw new ConflictException('현재 이용가능한 이벤트가 아닙니다.');
    }

    const existRewardReq = await this.rewardRequestModel.find({
      eventId: dto.eventId,
      userId: dto.userId,
      status: RewardRequestStatus.SUCCESS,
    });
    if (existRewardReq.length > 0) {
      await rewardReq.save();
      throw new ConflictException('이미 요청완료된 이벤트입니다.');
    }

    // todo:: 보상 조건 로직 추가

    rewardReq.status = RewardRequestStatus.SUCCESS;
    return rewardReq.save();
  }
}
