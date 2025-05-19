import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonJwtModule } from '@app/common/jwt/jwt.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/auth/.env'],
    }),
    CommonJwtModule,
    HttpModule,
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
