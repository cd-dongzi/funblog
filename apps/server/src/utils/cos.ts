import COS, { UploadBody } from 'cos-nodejs-sdk-v5';

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID,
  SecretKey: process.env.COS_SECRET_KEY,
});

const cosOptions = {
  Region: process.env.COS_REGION as string,
  Bucket: process.env.COS_BUCKET as string,
};

const formatKey = (Key: string) => {
  if (Key.startsWith('/')) {
    Key = Key.slice(1);
  }
  return Key;
};

export const putObject = async (Key: string, Body: UploadBody) => {
  try {
    await cos.putObject({
      ...cosOptions,
      Body,
      Key: formatKey(Key),
    });
    console.log('上传cos成功:', Key);
  } catch (e) {
    console.error('上传cos失败:', e);
  }
};

export const deleteObject = async (Key: string) => {
  try {
    await cos.deleteObject({
      ...cosOptions,
      Key: formatKey(Key),
    });
    console.log('删除cos成功:', Key);
  } catch (e) {
    console.error('删除cos失败:', e);
  }
};

export const deleteMultipleObject = async (Keys: (string | null)[]) => {
  try {
    const res = await cos.deleteMultipleObject({
      ...cosOptions,
      Objects: (Keys.filter((v) => v) as string[]).map((Key) => ({ Key: formatKey(Key) })),
    });
    console.log('删除cos成功:', res);
  } catch (e) {
    console.error('删除cos失败:', e);
  }
};

export const uploadFile = async (Key: string, FilePath: string) => {
  try {
    const res = await cos.uploadFile({
      ...cosOptions,
      FilePath,
      Key: formatKey(Key),
      SliceSize: 1024 * 1024 * 2, // 触发分块上传的阈值，超过2MB使用分块上传，非必须
    });
    console.log('上传cos成功:', res);
  } catch (e) {
    console.error('上传cos失败:', e);
  }
};

export const uploadFiles = async (files: { Key: string; FilePath: string }[]) => {
  const _files = files
    .filter((file) => file.Key && file.FilePath)
    .map(({ Key, FilePath }) => {
      return {
        ...cosOptions,
        Key: formatKey(Key),
        FilePath,
      };
    });
  try {
    const res = await cos.uploadFiles({
      files: _files,
      SliceSize: 1024 * 1024 * 2,
    });
    console.log(
      '上传cos成功:',
      res.files.map((file) => file.options.Key),
    );
  } catch (e) {
    console.error('上传cos失败:', e);
  }
};
export { cos, COS };
