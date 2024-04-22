import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, ValidateNested } from 'class-validator';

export class CreatePageDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '别名不能为空',
  })
  alias: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;

  @IsOptional()
  summary?: string;

  @IsOptional()
  cover?: string;

  @IsOptional()
  enableComment?: boolean;

  @IsOptional()
  encrypted?: boolean;

  @IsOptional()
  password?: string;

  @IsOptional()
  userId: number;
}
export class UpdatePageDto extends PartialType(CreatePageDto) {}

export interface PageMenuButtonProps {
  name: string;
  buttonType: string;
  id: string;
  open: number;
  value: number;
  url?: string;
  children?: PageMenuButtonProps[];
}

export class PageMenuButton {
  @IsNotEmpty({
    message: '菜单名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '菜单按钮类型不能为空',
  })
  buttonType: string;

  @IsNotEmpty({
    message: '菜单按钮id不能为空',
  })
  id: string;

  @IsOptional()
  @Transform(({ value }) => (value === true ? 1 : 0))
  open: number;

  @IsOptional()
  value: number;

  @IsOptional()
  url?: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  children?: PageMenuButtonProps[];
}

export class SavePageMenuDto {
  @IsNotEmpty({
    message: '菜单类型不能为空',
  })
  type: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PageMenuButton)
  data: PageMenuButtonProps[];
}
export class GetPageMenuDto {
  @IsNotEmpty({
    message: '菜单类型不能为空',
  })
  type: string;
}

export class QueryPageDto {
  @IsOptional()
  keyword: string;
}
