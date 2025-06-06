import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/event/.env'],
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27018/event',
    ),
    EventModule,
    RewardModule,
  ],
})
export class AppModule {}
