import { PartialType, PickType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class CreateUserDto {
  @IsNotEmpty({
    message: '用户名称不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '用户邮箱不能为空',
  })
  email: string;

  @IsNotEmpty({
    message: '用户密码不能为空',
  })
  password: string;

  @IsNotEmpty({
    message: '邀请码不能为空',
  })
  invitationCode: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  url?: string;
}

export class RegisterUserDto {
  @IsNotEmpty({
    message: '用户名称不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: '用户邮箱不能为空',
  })
  email: string;

  @IsNotEmpty({
    message: '用户密码不能为空',
  })
  password: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  url?: string;
}

export class UpdateUserDto extends PickType(PartialType(CreateUserDto), ['username', 'email', 'avatar', 'url']) {}

export class UpdateUserRolesDto {
  @IsArray({
    message: '用户权限不能为空',
  })
  userRoles: number[];
}

export class UpdateUserPasswordDto {
  @IsNotEmpty({
    message: '用户密码不能为空',
  })
  password: string;

  @IsNotEmpty({
    message: '用户当前密码不能为空',
  })
  oldPassword: string;
}

export class UpdateUserAvatarDto {
  @IsNotEmpty({
    message: '头像链接不能为空',
  })
  avatar: string;
}

export class GetUserInfoDto {
  @IsNotEmpty({
    message: '用户id不能为空',
  })
  id: string;
}

export class UserQueryDto {
  @IsOptional()
  keyword?: string;
}
export class UserPaginationPipe extends PaginationDto {
  @IsOptional()
  username?: string;
}
