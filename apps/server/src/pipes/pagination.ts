import { PAGESIZE } from '@funblog/constants';
import { Injectable, PipeTransform } from '@nestjs/common';
import { PaginationDto } from '../dtos/pagination.dto';

/**
 * 分页器管道
 */
@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: PaginationDto) {
    const take = value.pageSize ?? PAGESIZE;
    const skip = value.page ? (value.page - 1) * take : 0;

    value.take = take;
    value.skip = skip;
    return value;
  }
}
