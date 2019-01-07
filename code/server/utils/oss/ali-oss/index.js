import OSS from 'ali-oss'

const accessKeyId = '******'
const accessKeySecret = '******'
export const bucket = '******'
export const region = '******'
export const prefix = `http://${bucket}.${region}.aliyuncs.com/`
const client = new OSS({
  accessKeyId,
  accessKeySecret,
  bucket,
  region
})



export const put = (fileName, filePath, cb) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await client.put(fileName, filePath)
      resolve(result.url)
      cb && cb(result.url)
    } catch (e) {
      reject(e)
    }
  })
}

export const putStream = (fileName, stream, cb) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await client.putStream(fileName, stream)
      resolve(result.url)
      cb && cb(result.url)
    } catch (e) {
      reject(e)
    }
  })
}

export const del = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const fileName = url.replace(prefix, '')
      let result = await client.delete(fileName)
      resolve(result)
    } catch (e) {
      console.log(e)
      reject(e)
    }
  })

}