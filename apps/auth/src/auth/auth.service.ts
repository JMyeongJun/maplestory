import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import {
  LoginHistory,
  LoginHistoryDocument,
} from '../schemas/login-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectModel(LoginHistory.name)
    private readonly loginHistoryModel: Model<LoginHistoryDocument>,
  ) {}

  async validateUser(dto: AuthLoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    if (!user) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다.');
    }

    return user;
  }

  async login(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      roles: user.roles,
    };

    const loginhist = new this.loginHistoryModel({
      userId: user._id,
    });

    await loginhist.save();

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
