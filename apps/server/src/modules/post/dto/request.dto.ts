import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class CreatePostDto {
  @IsNotEmpty({
    message: '文章标题不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '文章别名不能为空',
  })
  alias: string;

  @IsNotEmpty({
    message: '文章内容不能为空',
  })
  content: string;

  @IsOptional()
  summary?: string;

  @IsOptional()
  cover?: string;

  @IsOptional()
  priority?: number;

  @IsOptional()
  enableComment?: boolean;

  @IsOptional()
  encrypted?: boolean;

  @IsOptional()
  password?: string;

  @IsOptional()
  visible?: boolean;

  @IsOptional()
  github?: string;

  @IsOptional()
  tags?: number[];

  @IsOptional()
  categories?: number[];

  @IsOptional()
  userId: number;
}
export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class PostPaginationDto extends PaginationDto {
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(',').map((v) => v))
  tags?: string[];

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => value.split(',').map((v) => v))
  categories?: string[];

  @IsOptional()
  title?: string;

  @IsOptional()
  summary?: string;

  @IsOptional()
  content?: string;
}
export class PostSearchPaginationDto extends PaginationDto {
  @IsOptional()
  keyword?: string;
}
