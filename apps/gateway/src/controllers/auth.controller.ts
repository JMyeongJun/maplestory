import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '@app/common/guards/roles.guard';
import { Roles } from '@app/common/decorators/roles.decorator';
import { UserRole } from '@app/common';
import { Request } from 'express';
import { CustomHttpService } from '../../../../libs/common/src/services/custom-http.service';
import { UpdateUserRolesDto } from 'apps/auth/src/user/dto/update-user-roles.dto';
import { AuthLoginDto } from 'apps/auth/src/auth/dto/auth-login.dto';

@Controller()
export class AuthController {
  private readonly host =
    process.env.AUTH_SERVER_URL || 'http://localhost:3001';

  constructor(private readonly httpService: CustomHttpService) {}

  @Post('/user')
  createUser(@Req() req: Request) {
    return this.httpService.post(`${this.host}/user`, req.body);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('/user/list')
  userList() {
    return this.httpService.get(`${this.host}/user/list`);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('/user/:id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.httpService.put(`${this.host}/user/${id}/role`, dto);
  }

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.httpService.post(`${this.host}/auth/login`, dto);
  }
}
