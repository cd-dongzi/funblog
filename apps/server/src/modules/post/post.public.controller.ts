import { Controller, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes } from '@nestjs/common';
import { Public } from 'src/decorators/public';
import { JwtAuthPublicGuard } from 'src/guards/jwtAuth.public.guard';
import { PaginationPipe } from 'src/pipes/pagination';
import { PostPaginationDto, PostSearchPaginationDto } from './dto/request.dto';
import { PostService } from './post.service';

@Public()
@Controller('p/post')
export class PostPublicController {
  constructor(private readonly postService: PostService) {}

  @Get('page')
  @UsePipes(PaginationPipe)
  async findPage(@Query() query: PostPaginationDto) {
    return this.postService.findPage(query, {
      where: {
        visible: true,
      },
    });
  }

  @Get('search/page')
  @UsePipes(PaginationPipe)
  async findSearchPage(@Query() query: PostSearchPaginationDto) {
    return this.postService.findSearchPage(query);
  }

  @Get('latest/list')
  async getLatestList() {
    return this.postService.getLatestList();
  }

  @Get('popular/list')
  async getPopularList() {
    return this.postService.getPopularList();
  }

  @Get(':id')
  async getPostInfo(@Param('id') id: string) {
    return this.postService.findOneById(+id);
  }

  @Get(':id/relation')
  @UseGuards(JwtAuthPublicGuard)
  getRelationInfo(@Param('id') id: string) {
    return this.postService.getRelationInfo(+id);
  }

  @Patch(':id/read')
  @UseGuards(JwtAuthPublicGuard)
  updateReadNum(@Param('id') id: string, @Req() req) {
    return this.postService.updateReadNum(+id, {
      userId: req.user?.id,
      ip: req.ip,
    });
  }

  @Post(':id/like/status')
  @UseGuards(JwtAuthPublicGuard)
  checkLikeStatus(@Param('id') id: string, @Req() req) {
    return this.postService.checkLikeStatus(+id, {
      userId: req.user?.id,
      ip: req.ip,
    });
  }

  @Patch(':id/like')
  @UseGuards(JwtAuthPublicGuard)
  updateLikeNum(@Param('id') id: string, @Req() req) {
    return this.postService.updateLikeNum(+id, {
      userId: req.user?.id,
      ip: req.ip,
    });
  }
}
