import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class CreateCommentDto {
  @IsNotEmpty({
    message: '路径不能为空',
  })
  path: string;

  @IsNotEmpty({
    message: '内容不能为空',
  })
  content: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  parentId?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  postId?: number;

  @IsOptional()
  @Transform(({ value }) => +value)
  pageId?: number;

  @IsOptional()
  type?: string;

  @IsOptional()
  @Transform(({ value }) => +value)
  replierUserId?: number;

  @IsOptional()
  status: string;
}
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}

export class CommentPaginationDto extends PaginationDto {
  @IsOptional()
  @Transform(({ value }) => +value || null)
  parentId?: number | null;
}

export class GetCommentPageDto extends PaginationDto {
  @IsNotEmpty({
    message: '路径为空，无法获取对应评论列表',
  })
  path: string;
}

export class GetCommentCountByPath {
  @IsNotEmpty({
    message: '路径不能为空',
  })
  @IsString()
  path: string;
}
