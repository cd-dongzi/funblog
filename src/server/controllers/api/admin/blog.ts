import { Context } from 'koa'
import { BlogModel } from '@server/models/blog'
import File from '@server/utils/file'
import authTokenMiddleware from '@server/middleware/authToken'
import rootConfig from '@root/src/shared/config'
import { formatQueryByList, getDataByPage } from '../utils'
import { Controller, Ctx, Get, Params, Post, Put, Delete, Query, Middleware } from '@server/decorators'

@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminBlogController {
  @Get('/blogs')
  async getBlogs(@Query() query: any) {
    const params = formatQueryByList(query)
    const data = await getDataByPage(params, BlogModel)
    return data
  }

  @Post('/blog')
  async addBlog(@Ctx() ctx: Context) {
    const paramsData = await File.uploadFile(ctx, {
      oss: rootConfig.isProd,
      fileDir: 'blog/images/'
    })
    await BlogModel.create(paramsData)
  }

  @Get('/blog/:id')
  async getBlogInfo(@Params('id') id: string) {
    const data = await BlogModel.findOne({
      _id: id
    })
    return data
  }

  @Put('/blog/:id')
  async updateBlogInfo(@Ctx() ctx: Context, @Params('id') id: string) {
    const data = await File.uploadFile(ctx, {
      oss: rootConfig.isProd,
      fileDir: 'blog/images/'
    })
    await BlogModel.findByIdAndUpdate(id, {
      ...data,
      updateTime: Date.now().toString()
    })
  }

  @Delete('/blog/:id')
  async deleteBlog(@Params('id') id: string) {
    await BlogModel.findByIdAndDelete(id)
  }
}
