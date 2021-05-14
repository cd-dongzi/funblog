import { Context } from 'koa'
import { PlayModel } from '@server/models/play'
import { Controller, Ctx, Get, Params, Post, Query } from '@server/decorators'
import url from 'url'
import serverConfig from '@server/config'
import send from 'koa-send'
import File from '@server/utils/file'
import Utils from '@root/build/utils'
import { formatQueryByList, getDataByPage } from '../utils'

@Controller('/client')
export default class ClientPlayController {
  @Get('/plays')
  async getPlays(@Query() query: any) {
    const params = formatQueryByList(query, {
      filter: {
        isVisible: true
      },
      options: {
        projection: {
          file: 0,
          folder: 0,
          __v: 0
        }
      }
    })
    const data = await getDataByPage(params, PlayModel)
    return data
  }

  @Get('/play/download/:id')
  async downloadPlay(@Params('id', true) id: string, @Ctx() ctx: Context) {
    const data = await PlayModel.findById(id)
    if (!data) {
      throw '未查到指定信息'
    }
    let downloadPath = new url.URL(data.url).pathname
    if (data.fileType === 'file') {
      downloadPath = `/${serverConfig.staticDir}${downloadPath}`
    } else {
      downloadPath = await File.compressZip({
        files: data.folder,
        zipDir: 'play/zips',
        fileDir: 'play/files'
      })
    }
    // 检查文件是否存在
    if (File.exists(Utils.resolve(downloadPath))) {
      ctx.attachment(downloadPath)
      await send(ctx, downloadPath)
      await PlayModel.updateOne(
        {
          _id: id
        },
        { $inc: { download_nums: 1 } }
      )
      return 'CUSTOM'
    } else {
      throw '无此文件或目录'
    }
  }
}
