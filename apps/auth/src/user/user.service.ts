import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteFriendDto } from './dto/invite-friend.dto';
import { Friend, FriendDocument } from '../schemas/friend.schema';
import {
  LoginHistory,
  LoginHistoryDocument,
} from '../schemas/login-history.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Friend.name)
    private readonly friendModel: Model<FriendDocument>,
    @InjectModel(LoginHistory.name)
    private readonly loginHistoryModel: Model<LoginHistoryDocument>,
  ) {}

  list() {
    return this.userModel.find();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.userModel.findOne({ email: dto.email });
    if (exists) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = new this.userModel({
      email: dto.email,
      password: hashed,
    });

    return user.save();
  }

  async updateUserRoles(userId: string, dto: UpdateUserRolesDto) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('유저가 없습니다.');
    }

    user.roles = dto.roles;

    return user.save();
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }

  async invite(dto: InviteFriendDto) {
    if (dto.userId === dto.targetUserId) {
      throw new BadRequestException('요청 유저가 같습니다.');
    }

    const user = await this.userModel.findById(dto.targetUserId);
    if (!user) {
      throw new NotFoundException('유저가 없습니다.');
    }

    const existFriend = await this.friendModel.find({
      userId: dto.userId,
      targetUserId: dto.targetUserId,
    });
    if (existFriend.length > 0) {
      throw new ConflictException('이미 친구 요청을 보냈습니다.');
    }

    const friend = new this.friendModel({
      userId: dto.userId,
      targetUserId: dto.targetUserId,
    });

    return friend.save();
  }

  async getFriends(id: string) {
    const friends = await this.friendModel.find({ userId: id });

    return friends;
  }

  async getLoginHistory(id: string) {
    const hist = await this.loginHistoryModel.find({ userId: id });

    return hist;
  }
}
