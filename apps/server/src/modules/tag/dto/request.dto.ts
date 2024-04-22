import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty({
    message: '分类名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '分类别名不能为空',
  })
  alias: string;
}
export class UpdateTagDto extends PartialType(CreateTagDto) {}

export class BatchRemoveTagDto {
  @IsNotEmpty({
    message: 'ID不能为空',
  })
  ids: number[];
}

export class QueryTagDto {
  @IsOptional()
  keyword: string;
}
