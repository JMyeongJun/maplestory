import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { CustomHttpService } from '@app/common/services/custom-http.service';
import { EventCondition } from '@app/common/enums/event-condition.enum';
import { RewardApproveDto } from './dto/reward-approve.dto';

@Injectable()
export class EventService {
  private readonly auth_host =
    process.env.AUTH_SERVER_URL || 'http://localhost:3001';

  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(RewardRequest.name)
    private readonly rewardRequestModel: Model<RewardRequestDocument>,
    private readonly httpService: CustomHttpService,
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

    try {
      const event = await this.eventModel.findOne({ _id: dto.eventId });

      if (!event) {
        throw new ConflictException('해당 이벤트를 찾지 못했습니다.');
      }
      if (!event.isActive) {
        throw new ConflictException('현재 이용가능한 이벤트가 아닙니다.');
      }

      const existRewardReq = await this.rewardRequestModel.findOne({
        eventId: dto.eventId,
        userId: dto.userId,
        status: RewardRequestStatus.SUCCESS,
      });

      let conditionPassed = false;
      switch (event.condition) {
        case EventCondition.INVITE_FRIENDS: {
          const friends: any[] = await this.httpService.get(
            `${this.auth_host}/user/${dto.userId}/friend`,
          );

          conditionPassed = friends.length >= event.conditionValue;
          break;
        }
        case EventCondition.LOGIN_COUNT: {
          const loginHist: any[] = await this.httpService.get(
            `${this.auth_host}/user/${dto.userId}/login-history`,
          );

          conditionPassed = loginHist.length >= event.conditionValue;
          break;
        }
      }
      if (!conditionPassed) {
        throw new ForbiddenException('이벤트 조건을 만족하지 못했습니다.');
      }

      if (existRewardReq) {
        throw new ConflictException('이미 요청완료된 이벤트입니다.');
      }

      rewardReq.isRewarded = !event.isRewardNeedApproved;

      if (rewardReq.isRewarded) {
        rewardReq.rewardedAt = new Date();
      }

      // todo: 보상 지급 로직

      rewardReq.status = RewardRequestStatus.SUCCESS;
    } catch (e) {
      await rewardReq.save();
      throw e;
    }

    return rewardReq.save();
  }

  async getRequestedRewardList(userId: string) {
    return this.rewardRequestModel.find(userId ? { userId: userId } : {});
  }

  async rewardApprove(dto: RewardApproveDto) {
    const rewards = await this.rewardRequestModel.find({
      _id: dto.rewardRequestId,
      status: RewardRequestStatus.SUCCESS,
    });

    if (rewards.length === 0) {
      throw new NotFoundException('해당 요청건이 존재하지 않습니다.');
    }

    const reward = rewards[0];

    reward.isRewarded = true;
    reward.rewardedAt = new Date();

    return reward.save();
  }
}
