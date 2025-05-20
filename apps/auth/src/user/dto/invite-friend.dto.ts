import { IsString } from 'class-validator';

export class InviteFriendDto {
  @IsString()
  userId: string;

  @IsString()
  targetUserId: string;
}
