import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Event, EventDocument } from '../schemas/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async createEvent(dto: CreateEventDto) {
    const exists = await this.eventModel.findOne({ title: dto.title });
    if (exists) {
      throw new ConflictException('중복된 이벤트 제목입니다.');
    }

    const event = new this.eventModel(dto);

    return event.save();
  }

  list() {
    return this.eventModel.find();
  }
}
