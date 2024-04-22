import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { PaginationDto } from 'src/dtos/pagination.dto';

export class CreateImageDto {
  userId: number;
  originalname: string;
  filename: string;
  originalUrl: string;
  url: string;
  thumbnailUrl?: string;
  metadata: Record<string, any>;
}
export class UpdateImageDto extends PartialType(CreateImageDto) {}

export class UpdateImageFilenameDto {
  @IsNotEmpty({
    message: '文件名不能为空',
  })
  filename: string;
}

export class ImagePaginationDto extends PaginationDto {}
