import { Body, Controller, Get, Post, Query, Req, UsePipes } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators/public';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationPipe } from 'src/pipes/pagination';
import { CreateVisitorDto } from './dto/request.dto';
import { VisitorService } from './visitor.service';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Public()
  @Post()
  create(@Body() body: CreateVisitorDto, @Req() request: Request) {
    return this.visitorService.create(body, request);
  }

  @Get('page')
  @UsePipes(PaginationPipe)
  getVisitorPage(@Query() query: PaginationDto) {
    return this.visitorService.getVisitorPage(query);
  }

  @Get('system')
  browser() {
    return this.visitorService.system();
  }

  @Get('location')
  location() {
    return this.visitorService.location();
  }

  @Get('count')
  count() {
    return this.visitorService.count();
  }
}
