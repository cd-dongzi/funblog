import { Body, Controller, Params, Get, Post, Put, Delete, Query, Middleware } from '@server/decorators'
import { GithubModel } from '@server/models/github'
import { CounterModel } from '@server/models/counter'
import authTokenMiddleware from '@server/middleware/authToken'
import { formatQueryByList, getDataByPage, getRepoInfo } from '../utils'

@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminGithubController {
  // 列表
  @Get('/githubs')
  async getGithubs(@Query() query: any) {
    const params = formatQueryByList(query, {
      options: {
        sort: {
          seq: -1
        }
      }
    })
    const data = await getDataByPage(params, GithubModel)
    return data
  }
  // 新增
  @Post('/github')
  async addGithub(@Body('name', true) name: string, @Body({ required: true }) body: AnyObject) {
    if (name) {
      const data = await getRepoInfo(name)
      if (data) {
        const counterData = await CounterModel.findOneAndUpdate({ name: 'github' }, { $inc: { count: 1 } }, { upsert: true, new: true })
        await GithubModel.create({
          ...body,
          ...data,
          seq: counterData.count
        })
      }
    }
  }
  // 项目详情
  @Get('/github/repo/:id')
  async getGithubRepoInfo(@Params('id') id: string) {
    const res = await GithubModel.findById(id)
    if (res) {
      const data = getRepoInfo(res.name)
      return data
    }
    return null
  }
  // 更新
  @Put('/github/:id')
  async updateBlogInfo(@Params('id') id: string, @Body() body: any) {
    await GithubModel.findByIdAndUpdate(id, body)
  }
  // 删除
  @Delete('/github/:id')
  async deleteBlog(@Params('id') id: string) {
    await GithubModel.findByIdAndDelete(id)
  }
  // 排序
  @Put('/githubs/sort')
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
      await GithubModel.bulkWrite(opts)
    }
    return null
  }
}
