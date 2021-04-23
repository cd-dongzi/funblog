import { Context } from 'koa'
import { PlayModel } from '@server/models/play'
import File from '@server/utils/file'
import authTokenMiddleware from '@server/middleware/authToken'
import { formatQueryByList, getDataByPage } from '../utils'
import { Controller, Ctx, Get, Params, Post, Put, Delete, Query, Middleware } from '@server/decorators'

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
      oss: false,
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
  @Get('/plays')
  async getPlays(@Query() query: any) {
    const params = formatQueryByList(query)
    const data = await getDataByPage(params, PlayModel)
    return data
  }

  @Post('/play')
  async addPlay(@Ctx() ctx: Context) {
    const data = await uploadFile(ctx)
    await PlayModel.create(data)
  }

  @Get('/play/:id')
  async getPlayInfo(@Params('id') id: string) {
    const data = await PlayModel.findOne({
      _id: id
    })
    return data
  }

  @Put('/play/:id')
  async updatePlayInfo(@Ctx() ctx: Context, @Params('id') id: string) {
    const data = await uploadFile(ctx, true)
    await PlayModel.findByIdAndUpdate(id, data)
  }

  @Delete('/play/:id')
  async deletePlay(@Params('id') id: string) {
    await PlayModel.findByIdAndDelete(id)
  }
}
