import { EventCondition } from '@app/common/enums/event-condition.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Event {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({
    type: String,
    enum: EventCondition,
    required: true,
  })
  condition: EventCondition;

  @Prop({ required: true })
  conditionValue: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop()
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  // 가상 필드로 처리
  isActive?: boolean;
}

const EventSchema = SchemaFactory.createForClass(Event);

// Virtual Field 설정
EventSchema.virtual('isActive').get(function (this: Event) {
  const now = new Date();

  const start = new Date(this.startDate);
  start.setHours(0, 0, 0, 0); // 자정 시작

  const end = new Date(this.endDate);
  end.setHours(23, 59, 59, 999); // 하루의 끝

  return start <= now && now <= end;
});

export { EventSchema };
