import { RewardType } from '@app/common/enums/reward-type.enum';
import {
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateRewardDto {
  @IsString()
  eventId: string;

  @IsEnum(RewardType)
  rewardType: RewardType;

  @IsInt()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsObject()
  rewardInfo: object;
}
