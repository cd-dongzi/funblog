import { BlogTagModel } from '@server/models/blogTag'
import { Body, Controller, Delete, Get, Params, Post, Put, Middleware } from '@server/decorators'
import { CounterModel } from '@server/models/counter'
import authTokenMiddleware from '@server/middleware/authToken'

@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminBlogTagController {
  // 新增标签
  @Post('/blogTag')
  async addBlogTag(@Body() params: AnyObject) {
    const counterData = await CounterModel.findOneAndUpdate({ name: 'blogTag' }, { $inc: { count: 1 } }, { upsert: true, new: true })
    return await BlogTagModel.create({
      name: params.name,
      color: params.color,
      icon: params.icon,
      seq: counterData.count
    })
  }
  // 列表
  @Get('/blogTags')
  async getBlogTags() {
    return await BlogTagModel.find().sort({
      seq: -1
    })
  }
  // 获取博客标签详情
  @Get('/blogTag/:id')
  async getBlogTag(@Params('id') id: string) {
    return await BlogTagModel.findOne({
      _id: id
    })
  }
  // 更新博客标签
  @Put('/blogTag/:id')
  async updateBlogTag(@Params('id') id: string, @Body() body: any) {
    await BlogTagModel.findByIdAndUpdate(id, body)
    return null
  }
  // 删除
  @Delete('/blogTag/:id')
  async deleteBlogTag(@Params('id') id: string) {
    await BlogTagModel.findByIdAndDelete(id)
    return null
  }
  // 排序
  @Put('/blogTags/sort')
  async sortBlogTags(@Body() body: any) {
    const arr: any[] = body
    if (arr.length > 0) {
      const opts = arr.map((item) => {
        return {
          updateOne: {
            filter: {
              _id: item._id
            },
            update: {
              seq: item.seq
            }
          }
        }
      })
      await BlogTagModel.bulkWrite(opts)
    }
    return null
  }
}
