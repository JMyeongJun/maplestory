import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteFriendDto } from './dto/invite-friend.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 리스트 조회
  @Get('/list')
  list() {
    return this.userService.list();
  }

  // 유저 추가
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  // 역할 수정
  @Put(':id/role')
  updateRole(@Param('id') id: string, @Body() dto: UpdateUserRolesDto) {
    return this.userService.updateUserRoles(id, dto);
  }

  // 친구추가
  @Post('friend')
  invite(@Body() dto: InviteFriendDto) {
    return this.userService.invite(dto);
  }

  // 친구 리스트 조회
  @Get(':id/friend')
  getFriends(@Param('id') id: string) {
    return this.userService.getFriends(id);
  }

  @Get(':id/login-history')
  getLoginHistory(@Param('id') id: string) {
    return this.userService.getLoginHistory(id);
  }
}
