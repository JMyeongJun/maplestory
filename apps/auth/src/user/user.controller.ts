import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteFriendDto } from './dto/invite-friend.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/list')
  list() {
    return this.userService.list();
  }

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Put(':id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.userService.updateUserRoles(id, dto);
  }

  @Post('invite')
  invite(@Body() dto: InviteFriendDto) {
    return this.userService.invite(dto);
  }
}
