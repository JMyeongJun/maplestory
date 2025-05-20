import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonJwtModule } from '@app/common/jwt/jwt.module';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './controllers/auth.controller';
import { CustomHttpService } from '../../../libs/common/src/services/custom-http.service';
import { EventController } from './controllers/event.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    CommonJwtModule,
    HttpModule,
  ],
  providers: [CustomHttpService],
  controllers: [AuthController, EventController],
})
export class GatewayModule {}
