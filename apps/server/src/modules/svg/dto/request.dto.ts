import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSvgDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  scope?: string[];

  @IsOptional()
  desc?: string;
}

export class UpdateSvgDto extends PartialType(CreateSvgDto) {}
