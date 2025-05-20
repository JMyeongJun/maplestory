import { IsString } from 'class-validator';

export class RewardApproveDto {
  @IsString()
  rewardRequestId: string;
}
