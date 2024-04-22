import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UsePipes, Query, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators/public';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { JwtAuthPublicGuard } from 'src/guards/jwtAuth.public.guard';
import { PaginationPipe } from 'src/pipes/pagination';
import {
  CreateUserDto,
  UpdateUserDto,
  UpdateUserRolesDto,
  UpdateUserPasswordDto,
  UpdateUserAvatarDto,
  RegisterUserDto,
  UserQueryDto,
} from './dto/request.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 注册用户
   *
   * @param {*} file
   * @param {CreateUserDto} data
   * @param {*} req
   * @return {*}
   * @memberof UserController
   */
  @Post()
  @Public()
  create(@Body() data: CreateUserDto, @Req() request: Request) {
    return this.userService.create({
      ...data,
      request,
    });
  }

  @Public()
  @Post('register')
  register(@Body() data: RegisterUserDto, @Req() request: Request) {
    return this.userService.register({
      ...data,
      request,
    });
  }

  /**
   * 禁用用户
   *
   * @param {string} id
   * @return {*}
   * @memberof UserController
   */
  @Patch(':id/disable')
  disableUser(@Param('id') id: string) {
    return this.userService.disableUser(+id);
  }

  /**
   * 启用用户
   *
   * @param {string} id
   * @return {*}
   * @memberof UserController
   */
  @Patch(':id/enable')
  enableUser(@Param('id') id: string) {
    return this.userService.enableUser(+id);
  }

  @Get('list')
  findList(@Query() query: UserQueryDto) {
    return this.userService.findList(query);
  }

  /**
   * 分页查询用户
   *
   * @param {PaginationDto} query
   * @return {*}
   * @memberof UserController
   */
  @Get('page')
  @UsePipes(PaginationPipe)
  findPage(@Query() query: PaginationDto) {
    return this.userService.findPage(query);
  }

  /**
   * 基于token查询用户信息
   *
   * @param {*} req
   * @return {*}
   * @memberof UserController
   */
  @Get('info/token')
  infoToken(@Req() req) {
    return this.userService.getUserById(req.user?.id);
  }

  @Get('info')
  @Public()
  @UseGuards(JwtAuthPublicGuard)
  info(@Req() req) {
    if (!req.user) {
      return {};
    }
    return this.userService.getUserById(req.user.id);
  }

  /**
   * 删除用户
   *
   * @param {string} id
   * @return {*}
   * @memberof UserController
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  /**
   * 更新用户权限
   *
   * @param {string} id
   * @param {UpdateUserRolesDto} UpdateUserRolesDto
   * @return {*}
   * @memberof UserController
   */
  @Patch(':id/role')
  updateUserRole(@Param('id') id: string, @Body() UpdateUserRolesDto: UpdateUserRolesDto) {
    return this.userService.updateUserRole(+id, UpdateUserRolesDto);
  }

  /**
   * 更新用户信息
   *
   * @param {string} id
   * @param {UpdateUserDto} data
   * @return {*}
   * @memberof UserController
   */
  @Patch(':id/info')
  updateUserInfo(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUserInfo(+id, data);
  }

  /**
   * 更新用户头像
   *
   * @param {string} id
   * @param {*} file
   * @param {*} req
   * @return {*}
   * @memberof UserController
   */
  @Post(':id/avatar')
  updateUserAvatar(@Param('id') id: string, @Body() body: UpdateUserAvatarDto) {
    return this.userService.updateUserInfo(+id, body);
  }

  @Patch(':id/password')
  updateUserPassword(@Param('id') id: string, @Body() data: UpdateUserPasswordDto) {
    return this.userService.updateUserPassword(+id, data);
  }

  @Get('count')
  count() {
    return this.userService.count();
  }

  @Public()
  @Post(':id/allow-login-admin')
  allowLoginAdmin(@Param('id') id: string) {
    return this.userService.allowLoginAdmin(+id);
  }
}
