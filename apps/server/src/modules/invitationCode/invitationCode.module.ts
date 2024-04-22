import { Module } from '@nestjs/common';
import { InvitationCodeController } from './invitationCode.controller';
import { InvitationCodeService } from './invitationCode.service';

@Module({
  controllers: [InvitationCodeController],
  providers: [InvitationCodeService],
})
export class InvitationCodeModule {}
