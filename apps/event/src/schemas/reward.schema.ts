import { RewardType } from '@app/common/enums/reward-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {
  @Prop({ required: true })
  eventId: string;

  @Prop({
    type: String,
    enum: RewardType,
    required: true,
  })
  rewardType: RewardType;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Object })
  rewardInfo: object;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const RewardSchema = SchemaFactory.createForClass(Reward);

export { RewardSchema };
