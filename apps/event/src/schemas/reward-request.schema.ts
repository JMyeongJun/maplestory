import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardRequestDocument = RewardRequest & Document;

@Schema()
export class RewardRequest {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  rewarded: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop()
  rewardedAt: Date;
}

const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);

export { RewardRequestSchema };
