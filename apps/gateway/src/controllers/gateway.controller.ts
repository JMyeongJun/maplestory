import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  @Get()
  getHello(@Req() req: Request) {
    return firstValueFrom(this.httpService.get('http://auth:3000/user/list'));
  }
}
