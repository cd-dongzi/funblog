import path from 'path'
import File from 'utils/file'
export default {
  async addImg(ctx, next) {
    log.adminTitle('Markdown/添加图片')
    try {
      const fileObj = await File.uploadFile(ctx, {
        filePath: $publicPath,
        dir: 'markdown',
        type: 'date'
      })
      ctx.send(fileObj)
    } catch (err) {
      ctx.sendError(err)
    }
  }
}
