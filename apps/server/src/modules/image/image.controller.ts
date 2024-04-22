import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { metaData } from 'src/config/metaData';
import { FileImage } from 'src/interceptors/fileImage';
import { uploadFiles } from 'src/utils/cos';
import { getFileMetadata, getFileName, getRealFullPath, getRealPath, transformImage } from 'src/utils/file';
import { ImagePaginationDto, UpdateImageFilenameDto } from './dto/request.dto';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('page')
  findImagePage(@Query() query: ImagePaginationDto) {
    return this.imageService.findImagePage(query);
  }

  @Post('upload')
  @UseInterceptors(FileImage('file'))
  async upload(@UploadedFile() file, @Req() req) {
    const imageConfig = metaData.config.image;
    const originalUrl = getRealPath(file.path);
    const { webp, thumbnail } = await transformImage(originalUrl, imageConfig);
    const url = webp?.url || originalUrl;
    const metadata = await getFileMetadata(url);
    uploadFiles([
      {
        Key: url,
        FilePath: getRealFullPath(url),
      },
      {
        Key: thumbnail?.url,
        FilePath: getRealFullPath(thumbnail?.url),
      },
    ]);
    return this.imageService.create({
      userId: req.user.id,
      originalname: file.originalname,
      filename: getFileName(url),
      originalUrl,
      url,
      thumbnailUrl: thumbnail?.url,
      metadata: {
        ...metadata,
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }

  @Patch(':id/filename')
  async updateFilename(@Param('id') id: string, @Body() body: UpdateImageFilenameDto) {
    return this.imageService.updateFilename(+id, body);
  }

  @Get(':id')
  async info(@Param('id') id: string) {
    return this.imageService.info(+id);
  }
}
