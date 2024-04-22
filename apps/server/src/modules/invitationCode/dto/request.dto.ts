import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import { IsArray, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateInvitationCodeDto {
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  expiredAt: Date;

  @IsArray()
  @IsNumber({}, { each: true })
  roles: number[];
}

export class UpdateInvitationCodeDto extends PartialType(CreateInvitationCodeDto) {}
