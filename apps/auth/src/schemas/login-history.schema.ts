import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LoginHistoryDocument = LoginHistory & Document;

@Schema()
export class LoginHistory {
  @Prop({ required: true })
  userId: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LoginHistorySchema = SchemaFactory.createForClass(LoginHistory);
