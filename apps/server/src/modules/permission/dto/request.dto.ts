import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({
    message: '权限名称不能为空',
  })
  readonly name: string;

  @IsNotEmpty({
    message: '权限code不能为空',
  })
  readonly code: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
