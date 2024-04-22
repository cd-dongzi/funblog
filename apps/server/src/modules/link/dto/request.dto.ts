import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty({
    message: '标题不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '描述不能为空',
  })
  desc: string;

  @IsNotEmpty({
    message: '链接不能为空',
  })
  url: string;

  @IsNotEmpty({
    message: 'Logo不能为空',
  })
  logo: string;

  @IsNotEmpty({
    message: '类型不能为空',
  })
  type: string;
}

export class UpdateLinkDto extends PartialType(CreateLinkDto) {
  @IsOptional()
  visible?: boolean;

  @IsOptional()
  status?: string;
}

export class QueryLinkDto {
  @IsOptional()
  keyword: string;
}
