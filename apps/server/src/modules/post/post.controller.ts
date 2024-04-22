import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query, Req } from '@nestjs/common';
import { PaginationPipe } from 'src/pipes/pagination';
import { PostPaginationDto, CreatePostDto, UpdatePostDto } from './dto/request.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postService.create({
      ...createPostDto,
      userId: req.user.id,
    });
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('page')
  @UsePipes(PaginationPipe)
  findPage(@Query() query: PostPaginationDto) {
    return this.postService.findPage(query);
  }

  @Get('count')
  count() {
    return this.postService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
