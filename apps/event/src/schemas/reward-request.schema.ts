import { RewardRequestStatus } from '@app/common/enums/reward-request-status.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema()
export class RewardRequest {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: false })
  isRewarded: boolean;

  @Prop({
    type: String,
    enum: RewardRequestStatus,
    required: true,
  })
  status: RewardRequestStatus;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  rewardedAt: Date;
}

const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

export { RewardRequestSchema };
