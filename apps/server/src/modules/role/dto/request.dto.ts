import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({
    message: '角色名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '角色code不能为空',
  })
  code: string;

  @IsArray({
    message: '请传入数组类型',
  })
  permissions: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
