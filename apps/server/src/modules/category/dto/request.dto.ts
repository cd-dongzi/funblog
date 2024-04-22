import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({
    message: '分类名称不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: '分类别名不能为空',
  })
  alias: string;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}

export class BatchRemoveCategoryDto {
  @IsNotEmpty({
    message: '分类ID不能为空',
  })
  ids: number[];
}

export class QueryCategoryDto {
  @IsOptional()
  keyword: string;
}
