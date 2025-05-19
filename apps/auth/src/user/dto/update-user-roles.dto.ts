import { UserRole } from '@app/common';
import { ArrayNotEmpty, IsArray, IsEnum } from 'class-validator';

export class UpdateUserRolesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
