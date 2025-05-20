import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  targetUserId: string;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);

// 복합 유니크 인덱스 추가
FriendSchema.index({ userId: 1, targetUserId: 1 }, { unique: true });
