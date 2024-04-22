import { IsOptional } from 'class-validator';

export class CreateVisitorDto {
  @IsOptional()
  ip?: string;

  @IsOptional()
  userAgent?: string;
}
