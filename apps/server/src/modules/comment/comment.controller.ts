import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, UpdateCommentDto, CommentPaginationDto } from './dto/request.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @Post()
  createComment(@Body() data: CreateCommentDto, @Req() req) {
    return this.commentService.createComment(data, +req.user.id);
  }

  @Get('page')
  @UseGuards(CommentPaginationDto)
  findPage(@Query() query: CommentPaginationDto) {
    return this.commentService.findPage(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() body: UpdateCommentDto) {
    return this.commentService.updateStatus(+id, body);
  }

  @Get('count')
  count() {
    return this.commentService.count();
  }
}
