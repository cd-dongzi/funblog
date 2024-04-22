// custom-file-interceptor.util.ts

import fs from 'fs';
import path, { relative, join } from 'path';
import sharp from 'sharp';
import { FALLBACK_PICTURE_TYPE, STATIC_DIR } from 'src/constants';
import { SiteImageConfig } from 'src/modules/site/site.interface';

const allowedFormats = ['.png', '.jpg', '.jpeg', '.gif'];
const isAllowedFormat = (filePath) => allowedFormats.includes(path.extname(filePath).toLowerCase());
export const isGif = (filePath) => path.extname(filePath).toLowerCase() === '.gif';
const isJpg = (filePath) => path.extname(filePath).toLowerCase() === '.jpg';

/**
 * 获取真实路径
 *
 * @export
 * @param {string} path
 * @return {*}
 */
export function getRealPath(path: string) {
  return `/${relative(STATIC_DIR, path)}`;
}

/**
 * 获取真实完整路径
 *
 * @export
 * @param {string} path
 * @return {*}
 */
export function getRealFullPath(path: string) {
  if (!path) return path;
  return join(STATIC_DIR, path);
}

/**
 * 获取文件元数据
 *
 * @export
 * @param {*} _path
 * @return {*}
 */
export async function getFileMetadata(_path) {
  const size = fs.statSync(path.join(STATIC_DIR, _path)).size;
  try {
    const metadata = await sharp(path.join(STATIC_DIR, _path)).metadata();
    return { ...metadata, size };
  } catch (e) {
    // 不支持的类型
    return {
      size,
    };
  }
}

/**
 * 获取文件名
 *
 * @export
 * @param {*} _path
 * @return {*}
 */
export function getFileName(_path) {
  return path.basename(_path);
}

type Key = 'webp' | 'thumbnail' | 'fallback';
type TransformImageResult = Record<
  Key,
  {
    url: string;
    data: Record<string, any>;
  }
>;
/**
 * 图片转webp
 *
 * @export
 * @param {*} _path
 * @return {*}
 */
export async function transformImage(_path, options?: Partial<SiteImageConfig>): Promise<TransformImageResult> {
  if (!isAllowedFormat(_path)) return Promise.resolve({} as TransformImageResult);
  const opts = {
    animated: !!isGif(_path),
  };
  const fullPath = path.join(STATIC_DIR, _path);
  const dir = path.dirname(fullPath);
  const name = path.basename(fullPath, path.extname(fullPath));
  const prefix = path.join(dir, name);
  let output = fullPath;
  let thumbnailOutput = fullPath;
  let outputJpg = fullPath;
  const metadata = await sharp(fullPath).metadata();

  const promises: { url: string; key: Key; promise: Promise<any> }[] = [];
  // 达到指定大小进行webp转换
  if (options?.enableWebp && fs.statSync(fullPath).size >= (options.webpThreshold || 0) * 1024) {
    output = `${prefix}.webp`;
    promises.push({
      url: output,
      key: 'webp',
      promise: sharp(fullPath, opts).toFormat('webp').toFile(output),
    });
  }

  // 达到指定宽度进行缩略图的转换
  if (options?.enableThumbnail && metadata.width && metadata.width > (options?.thumbnailThreshold || 0)) {
    thumbnailOutput = `${prefix}.thumbnail.webp`;
    promises.push({
      url: thumbnailOutput,
      key: 'thumbnail',
      promise: sharp(fullPath, opts)
        .resize({
          width: options.thumbnailWidth,
        })
        .toFormat('webp')
        .toFile(thumbnailOutput),
    });
  }

  // jpg文件兜底处理，此兜底用于webp不支持的时候，默认回滚到这个路径
  if (!isJpg(fullPath) && !isGif(fullPath)) {
    outputJpg = `${prefix}.${FALLBACK_PICTURE_TYPE}`;
    promises.push({
      url: outputJpg,
      key: 'fallback',
      promise: sharp(fullPath, opts).toFormat(FALLBACK_PICTURE_TYPE).toFile(outputJpg),
    });
  }
  const data = await Promise.all(promises.map((p) => p.promise)).then((results) => {
    return promises.map((item, index) => ({
      url: item.url,
      key: item.key,
      data: results[index],
    }));
  });
  return data.reduce((prev, curr) => {
    prev[curr.key] = {
      url: getRealPath(curr.url),
      data: curr.data,
    };
    return prev;
  }, {} as TransformImageResult);
}

export function getPathWithoutExt(_path: string) {
  const dir = path.dirname(_path);
  const name = path.basename(_path, path.extname(_path));
  const prefix = path.join(dir, name);
  return prefix;
}

function extractPrefix(url: string) {
  const arr = url.split('.');
  return arr[0];
}
function extractSuffix(url: string) {
  const arr = url.split('.');
  return `.${arr.slice(1).join('.')}`;
}
/**
 * 重命名文件
 *
 * @export
 * @param {string[]} paths
 * @param {string} filename
 * @return {*}
 */
export function renameFiles(paths: string[], filename: string) {
  const arr = [] as string[];
  const _prefix = extractPrefix(filename);
  for (let key = 0; key < paths.length; key++) {
    const _path = paths[key];
    const _newPath = path.join(path.dirname(_path), _prefix + extractSuffix(_path));
    fs.renameSync(_path, _newPath);
    arr.push(getRealPath(_newPath));
  }
  return arr;
}

/**
 * 删除文件
 *
 * @export
 * @param {string[]} files
 */
export function removeFiles(files: string[]) {
  for (let key = 0; key < files.length; key++) {
    const file = files[key];
    const _path = path.join(STATIC_DIR, file);
    if (fs.existsSync(_path)) {
      fs.unlinkSync(path.join(STATIC_DIR, file));
    }
  }
}
