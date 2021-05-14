import { Context } from 'koa'
import File from '@server/utils/file'
import authTokenMiddleware from '@server/middleware/authToken'
import rootConfig from '@root/src/shared/config'
import oss from '@server/utils/oss'
import { Controller, Ctx, Post, Middleware } from '@server/decorators'

const fileDir = 'play/files/'

const uploadFile = async (ctx: Context, overlay = false) => {
  const data = await File.uploadFile(ctx, {
    folder: {
      oss: false,
      rename: false,
      fileDir,
      overlay
    },
    file: {
      oss: false,
      rename: false,
      fileDir,
      overlay
    },
    cover: {
      oss: rootConfig.isProd,
      rename: true,
      fileDir: 'play/images/'
    }
  })
  if (data.file) {
    data.url = data.file
    data.folder = []
  }
  if (data.folder && data.folder.length > 0) {
    data.url = data.folder.find((url: string) => url.endsWith('/index.html'))
    data.file = ''
  }
  return data
}
@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminPlayController {
  @Post('/oss/upload')
  async uploadOss(@Ctx() ctx: Context) {
    const data = await File.uploadFile(ctx, {
      ossAction: async (file, params) => {
        const client = oss.createOssClient({
          region: params.region,
          bucket: params.bucket,
          endpoint: params.endpoint
        })
        const path = `${params.dir}/${params.rename && params.fileType === 'file' ? File.rename(params.filename) : params.filename}`
          .split('/')
          .filter((i) => i.length)
          .join('/')
        const url = await oss.putStream(path, file, client)
        return url
      }
    })
    return data
  }
}
