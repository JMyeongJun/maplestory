import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from '../schemas/event.schema';
import {
  RewardRequest,
  RewardRequestSchema,
} from '../schemas/reward-request.schema';
import { HttpModule } from '@nestjs/axios';
import { CustomHttpService } from '@app/common/services/custom-http.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
    HttpModule,
  ],
  controllers: [EventController],
  providers: [EventService, CustomHttpService],
})
export class EventModule {}
