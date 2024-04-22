import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { CreateInvitationCodeDto, UpdateInvitationCodeDto } from './dto/request.dto';
import { InvitationCodeService } from './invitationCode.service';

@Controller('invitation-code')
export class InvitationCodeController {
  constructor(private readonly invitationCodeService: InvitationCodeService) {}

  @Post()
  create(@Body() createInvitationCodeDto: CreateInvitationCodeDto, @Req() req) {
    return this.invitationCodeService.create({
      ...createInvitationCodeDto,
      userId: req.user.id,
    });
  }

  @Get('list')
  findAll() {
    return this.invitationCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitationCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvitationCodeDto: UpdateInvitationCodeDto) {
    return this.invitationCodeService.update(+id, updateInvitationCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitationCodeService.remove(+id);
  }
}
