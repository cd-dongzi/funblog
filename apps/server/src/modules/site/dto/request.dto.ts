import { PartialType } from '@nestjs/mapped-types';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';

export class SiteMetaDto {
  @IsNotEmpty({
    message: '站点title不能为空',
  })
  title: string;

  @IsNotEmpty({
    message: '站点keywords不能为空',
  })
  keywords: string;

  @IsNotEmpty({
    message: '站点description不能为空',
  })
  description: string;

  @IsNotEmpty({
    message: '站点favicon不能为空',
  })
  favicon: string;

  @IsNotEmpty({
    message: '站点logo不能为空',
  })
  logo: string;

  @IsNotEmpty({
    message: '站点url不能为空',
  })
  url: string;

  @IsNotEmpty({
    message: '资源url不能为空',
  })
  resourceUrl: string;

  @IsNotEmpty({
    message: '服务端url不能为空',
  })
  serverUrl: string;

  @IsNotEmpty({
    message: '管理端url不能为空',
  })
  adminUrl: string;

  @IsNotEmpty({
    message: '站点footerLinks不能为空',
  })
  footerLinks: Record<string, any>;
}

export class SiteBloggerDto {
  @IsNotEmpty({
    message: 'avatar不能为空',
  })
  avatar: string;

  @IsNotEmpty({
    message: 'avatar不能为空',
  })
  username: string;

  @IsNotEmpty({
    message: 'avatar不能为空',
  })
  desc: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @Transform(({ value }) => {
    return value;
  })
  adminUsers?: number[];
}

class SiteImageSubDto {
  @IsNotEmpty({
    message: 'webpThreshold不能为空',
  })
  webpThreshold: number;

  @IsNotEmpty({
    message: 'thumbnailThreshold不能为空',
  })
  thumbnailThreshold: number;

  @IsNotEmpty({
    message: 'thumbnailWidth不能为空',
  })
  thumbnailWidth: number;
}

export class SiteImageDto extends PartialType(SiteImageSubDto) {
  @IsNotEmpty({
    message: 'enableWebp不能为空',
  })
  enableWebp: boolean;

  @IsNotEmpty({
    message: 'enableThumbnail不能为空',
  })
  enableThumbnail: boolean;

  @IsNotEmpty({
    message: 'storageStrategy不能为空',
  })
  storageStrategy: string;
}

export class SitePaginationDto {
  @IsPositive({
    message: '文章每页条数必须大于0',
  })
  postPageSize: number;
}

export class SiteUserDto {
  @IsOptional()
  allowRegister: boolean;

  @IsOptional()
  allowUploadAvatar: boolean;

  @IsOptional()
  notifyOnUserRegister: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  avatarList: string[];
}

class SocialAccountUrl {
  @IsNotEmpty({
    message: 'name不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: 'url不能为空',
  })
  url: string;
}
export class SiteSocialAccountDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialAccountUrl)
  links: SocialAccountUrl[];
}

class CommentItem {
  @IsNotEmpty({
    message: 'name不能为空',
  })
  name: string;

  @IsNotEmpty({
    message: 'value不能为空',
  })
  value: string;
}
export class SiteCommentDto {
  @IsPositive({
    message: '文章每页条数必须大于0',
  })
  pageSize: number;

  @IsNotEmpty()
  enableComment: boolean;

  @IsNotEmpty()
  viewOnly: boolean;

  @IsNotEmpty()
  review: boolean;

  @IsNotEmpty()
  approvedPass: boolean;

  @IsNotEmpty()
  notifyAfterComment: boolean;

  @IsNotEmpty()
  emailAfterApproval: boolean;

  @IsNotEmpty()
  emailAfterReply: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CommentItem)
  emojiList: CommentItem[];
}

export class SiteCommentReviewDto {
  @IsOptional()
  forceReviewKeywords?: string;

  @IsOptional()
  forbiddenKeywords?: string;
}

export class SiteEmailDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  smtpHost: string;

  @IsNotEmpty()
  smtpPort: number;

  @IsNotEmpty()
  senderEmail: string;

  @IsNotEmpty()
  senderPassword: string;
}

export class SiteAdvanceDto {
  @IsNotEmpty()
  @Transform(({ value }) => +value)
  tokenExpiresIn: number;
}

export class SiteLinkDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  logo: string;
}

export class SiteLayoutDto {
  @IsNotEmpty()
  showSidebar: string;
}
