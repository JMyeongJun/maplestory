import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FriendDocument = Friend & Document;

@Schema()
export class Friend {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  targetUserId: string;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const FriendSchema = SchemaFactory.createForClass(Friend);
