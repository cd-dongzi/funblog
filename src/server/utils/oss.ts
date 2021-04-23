import OSS from 'ali-oss'
import rootConfig from '@root/src/shared/config'
const oss = rootConfig.oss
const { accessKeyId, accessKeySecret, bucket, region, prefix } = oss
let client: OSS
if (rootConfig.openOss) {
  client = new OSS({
    accessKeyId,
    accessKeySecret,
    bucket,
    region,
    secure: rootConfig.isHttps,
    endpoint: rootConfig.imgHost,
    cname: true
  })
}

// 普通上传
const put = (fileName: string, filePath: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await client.put(fileName, filePath)
      resolve(result.url)
    } catch (e) {
      reject(e)
    }
  })
}
// 流式上传
const putStream = (fileName: string, stream: any) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const result: any = await client.putStream(fileName, stream)
      resolve(result.url as string)
    } catch (e) {
      reject(e)
    }
  })
}
// 删除
const del = (url: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = url.replace(prefix, '')
      const result = await client.delete(fileName)
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  put,
  putStream,
  del
}
