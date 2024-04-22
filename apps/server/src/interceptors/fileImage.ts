// custom-file-interceptor.util.ts

import fs from 'fs';
import path from 'path';
import { BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor, FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MulterField, MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import dayjs from 'dayjs';
import { diskStorage } from 'multer';
import { nanoid } from 'nanoid';
import { STATIC_IMAGE_DIR } from 'src/constants';

function getOptions(localOptions?: MulterOptions) {
  return {
    storage: diskStorage({
      destination: (req, file, cb) => {
        if (!fs.existsSync(STATIC_IMAGE_DIR)) {
          fs.mkdirSync(STATIC_IMAGE_DIR, { recursive: true });
        }
        cb(null, STATIC_IMAGE_DIR);
      },
      filename: (req, file, callback) => {
        const filename = `${dayjs(Date.now()).format('YYYYMMDD')}${nanoid(4)}${path.extname(file.originalname)}`;
        callback(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
        return callback(new BadRequestException('只允许上传图片文件'), false);
      }
      callback(null, true);
    },
    ...(localOptions || {}),
  };
}
export function FileImage(fieldName?: string, localOptions?: MulterOptions) {
  return FileInterceptor(fieldName || '', {
    ...getOptions(localOptions),
  });
}
export function FilesImage(uploadFields: MulterField[], localOptions?: MulterOptions) {
  return FileFieldsInterceptor(uploadFields, {
    ...getOptions(localOptions),
  });
}
export function AnyFilesImage(localOptions?: MulterOptions) {
  return AnyFilesInterceptor({
    ...getOptions(localOptions),
  });
}
