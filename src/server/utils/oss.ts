import OSS from 'ali-oss'
import rootConfig from '@root/src/shared/config'
const oss = rootConfig.oss

const { accessKeyId, accessKeySecret, bucket, region, prefix } = oss
// 生成oss实例
const createOssClient = (options: Partial<OSS.Options>) => {
  return new OSS({
    accessKeyId,
    accessKeySecret,
    secure: rootConfig.isHttps,
    endpoint: rootConfig.imgHost,
    cname: true,
    ...options
  })
}

const client = createOssClient({
  bucket,
  region,
  endpoint: rootConfig.imgHost
})
// 普通上传
const put = (fileName: string, filePath: string, instance?: OSS) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any
      if (instance) {
        result = await instance.putStream(fileName, filePath)
      } else {
        result = await client.put(fileName, filePath)
      }
      resolve(result.url)
    } catch (e) {
      reject(e)
    }
  })
}
// 流式上传
const putStream = (fileName: string, stream: any, instance?: OSS) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      let result: any
      if (instance) {
        result = await instance.putStream(fileName, stream)
      } else {
        result = await client.putStream(fileName, stream)
      }
      resolve(result.url as string)
    } catch (e) {
      reject(e)
    }
  })
}
// 删除
const del = (url: string, instance?: OSS) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = url.replace(prefix, '')
      let result: any
      if (instance) {
        result = await instance.delete(fileName)
      } else {
        result = await client.delete(fileName)
      }
      resolve(result)
    } catch (e) {
      reject(e)
    }
  })
}

export default {
  createOssClient,
  put,
  putStream,
  del
}
