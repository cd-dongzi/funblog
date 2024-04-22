import fs from 'fs';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { getRealFullPath } from 'src/utils/file';

async function middleware(req: Request, res: Response, next) {
  // webp不兼容，降级到jpg
  if (req.url.endsWith('.webp') && !req.headers.accept?.includes('image/webp')) {
    const originalPath = req.url.slice(0, -5);
    if (fs.existsSync(getRealFullPath(originalPath + '.gif'))) {
      return res.redirect(301, originalPath + '.gif');
    } else {
      return res.redirect(301, originalPath + '.jpg');
    }
  }
  return next();
}
/**
 * webp 图片资源 中间件
 *
 * @export
 * @class webpMiddleware
 * @implements {NestMiddleware}
 */
@Injectable()
export class WebpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next) {
    return middleware(req, res, next);
  }
}

export function WebpGlobalMiddleware() {
  return middleware;
}
