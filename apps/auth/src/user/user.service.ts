import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { InviteFriendDto } from './dto/invite-friend.dto';
import { Friend, FriendDocument } from './friend.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Friend.name)
    private readonly friendModel: Model<FriendDocument>,
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
    const user = await this.userModel.findById(dto.targetUserId);
    if (!user) {
      throw new NotFoundException('유저가 없습니다.');
    }

    const friend = new this.friendModel({
      userId: dto.userId,
      targetUserId: dto.targetUserId,
    });

    return friend.save();
  }
}
