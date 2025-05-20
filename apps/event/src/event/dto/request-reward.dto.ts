import { IsString } from 'class-validator';

export class RequestRewardDto {
  @IsString()
  eventId: string;

  @IsString()
  userId: string;
}
