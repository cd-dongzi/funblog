import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

// 分页请求DTO
export class PaginationDto {
  @IsOptional()
  @Type()
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type()
  @IsNumber()
  pageSize?: number;

  // sql忽略条数
  skip?: number;
  // sql返回条数
  take?: number;
}
