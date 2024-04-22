import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { PaginationPipe } from 'src/pipes/pagination';
import { CommentService } from './comment.service';
import { GetCommentPageDto, GetCommentCountByPath } from './dto/request.dto';

@Public()
@Controller('p/comment')
export class CommentPublicController {
  constructor(private readonly commentService: CommentService) {}
  @Get('page')
  @UsePipes(PaginationPipe)
  getCommentPage(@Query() query: GetCommentPageDto) {
    return this.commentService.getCommentPage(query);
  }

  @Get('count')
  getCommentCountByPath(@Query() query: GetCommentCountByPath) {
    return this.commentService.getCommentCountByPath(query);
  }
}
