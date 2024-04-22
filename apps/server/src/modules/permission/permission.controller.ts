import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationPipe } from 'src/pipes/pagination';
import { CreatePermissionDto, UpdatePermissionDto } from './dto/request.dto';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @Get('page')
  @UsePipes(PaginationPipe)
  findPage(@Query() query: PaginationDto) {
    return this.permissionService.findPage(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
