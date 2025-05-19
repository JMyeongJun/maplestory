import { EventCondition } from '@app/common/enums/event-condition.enum';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsEnum(EventCondition)
  condition: EventCondition;

  @IsInt()
  @IsPositive()
  conditionValue: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsOptional()
  @IsString()
  description?: string;
}
