import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common';
import { CustomHttpService } from '../../../../libs/common/src/services/custom-http.service';
import { RequestWithUser } from '@app/common/types/request-with-user';
import { CreateEventDto } from 'apps/event/src/event/dto/create-event.dto';
import { CreateRewardDto } from 'apps/event/src/reward/dto/create-reward.dto';

@Controller()
export class EventController {
  private readonly host =
    process.env.EVENT_SERVER_URL || 'http://localhost:3002';

  constructor(private readonly httpService: CustomHttpService) {}

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Post('/event')
  createEvent(@Body() dto: CreateEventDto) {
    return this.httpService.post(`${this.host}/event`, dto);
  }

  @Get('/event')
  getEventList() {
    return this.httpService.get(`${this.host}/event`);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/event/reward/request')
  requestReward(@Req() req: RequestWithUser) {
    return this.httpService.post(`${this.host}/event/reward/request`, {
      ...req.body,
      userId: req.user.userId,
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/event/reward/request')
  getRequestedRewardList(@Req() req: RequestWithUser) {
    const url = new URL(`${this.host}/event/reward/request`);
    url.searchParams.set('userId', req.user.userId);

    return this.httpService.get(url.toString());
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get('admin/event/reward/request')
  adminGetRequestedRewardList() {
    const url = new URL(`${this.host}/event/reward/request`);

    return this.httpService.get(url.toString());
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Post('/event/reward')
  createReward(@Body() dto: CreateRewardDto) {
    return this.httpService.post(`${this.host}/reward`, dto);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get('/event/reward')
  getRewardList() {
    return this.httpService.get(`${this.host}/reward`);
  }
}
