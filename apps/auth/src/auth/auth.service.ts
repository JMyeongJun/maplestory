import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDocument } from '../user/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

  login(user: UserDocument) {
    const payload = {
      sub: user._id,
      email: user.email,
      roles: user.roles,
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
