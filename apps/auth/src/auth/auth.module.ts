import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonJwtModule } from '@app/common/jwt/jwt.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  LoginHistory,
  LoginHistorySchema,
} from '../schemas/login-history.schema';

@Module({
  imports: [
    UserModule,
    CommonJwtModule,
    MongooseModule.forFeature([
      { name: LoginHistory.name, schema: LoginHistorySchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
