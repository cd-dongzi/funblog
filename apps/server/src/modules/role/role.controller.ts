import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { PaginationPipe } from 'src/pipes/pagination';
import { CreateRoleDto, UpdateRoleDto } from './dto/request.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get('page')
  @UsePipes(PaginationPipe)
  findPage(@Query() query: PaginationDto) {
    return this.roleService.findPage(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
