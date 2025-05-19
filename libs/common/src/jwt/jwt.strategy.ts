import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    });
  }

  validate(payload: { sub: string; email: string; roles: UserRole[] }) {
    return {
      userId: payload.sub,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
