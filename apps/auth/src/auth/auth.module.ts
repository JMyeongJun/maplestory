import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { CommonJwtModule } from '@app/common/jwt/jwt.module';

@Module({
  imports: [UserModule, CommonJwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
