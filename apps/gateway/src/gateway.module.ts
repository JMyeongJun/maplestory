import { Module } from '@nestjs/common';
import { GatewayController } from './controllers/gateway.controller';
import { ConfigModule } from '@nestjs/config';
import { CommonJwtModule } from '@app/common/jwt/jwt.module';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './controllers/auth.controller';
import { CustomHttpService } from './http.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'apps/auth/.env'],
    }),
    CommonJwtModule,
    HttpModule,
  ],
  providers: [CustomHttpService],
  controllers: [GatewayController, AuthController],
})
export class GatewayModule {}
