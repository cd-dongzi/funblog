import { BlogCommentModel } from '@server/models/blogComment'
import { CounterModel } from '@server/models/counter'
import sms from '@server/utils/sms'
import { Body, Controller, Get, Post, Put, Query, Token } from '@server/decorators'
import { filterXSS } from '@root/src/shared/utils/xss'
import { formatQueryByList, getDataByPage } from '../utils'
import ClientUserController from './user'
import { BlogModel } from '@server/models/blog'
import { UserDocument } from '@server/models/user'

// 发送短信
const sendSms = (articleId: string, data: UserDocument, content: string, type: string) => {
  BlogModel.findById(articleId).then((res) => {
    if (res) {
      sms.sendSmsByBlogComment({
        title: res.title,
        type,
        name: data.name,
        msg: content
      })
    }
  })
}

@Controller('/client')
export default class ClientBlogCommentController {
  // 获取留言
  @Get('/blogComments')
  async getBlogCommentsPage(@Query() que: any) {
    const query = formatQueryByList(que)
    query.projection = {
      ...query.projection,
      userId: 0
    }
    const data = await getDataByPage(query, BlogCommentModel)
    if (data.list) {
      data.list = data.list.map((item) => {
        if (item.replyList) {
          item.replyList = item.replyList.map((v) => {
            delete v.userId
            return v
          })
        }
        return item
      })
    }
    return data
  }
  // 提交
  @Post('/blogComment')
  async addBlogComment(@Body('content', true) content: string, @Body('articleId', true) articleId: string, @Token() token: string) {
    const data = await new ClientUserController().getUserInfoByToken(token)
    if (data) {
      const counterData = await CounterModel.findOneAndUpdate(
        { name: `blogComment-${articleId}` },
        { $inc: { count: 1 } },
        { upsert: true, new: true }
      )
      await BlogCommentModel.create({
        articleId,
        userId: data._id,
        name: data.name,
        avatar: data.avatar,
        url: data.url,
        role: data.role,
        content: filterXSS(content),
        floor: counterData.count
      })
      const count = await BlogCommentModel.find({ articleId }).countDocuments()
      await BlogModel.updateOne(
        {
          _id: articleId
        },
        {
          comment_nums: count
        }
      )
      sendSms(articleId, data, content, '文章留言')
    }
  }
  // 回复
  @Put('/blogComment/reply')
  async replyBlogComment(@Body() body: AnyObject, @Token() token: string) {
    const { questioner, _id, replayContent } = body
    const userData = await new ClientUserController().getUserInfoByToken(token)
    const data = await BlogCommentModel.findById(_id)
    if (data && userData) {
      data.replyList.push({
        _id,
        userId: userData._id,
        name: userData.name,
        avatar: userData.avatar,
        url: userData.url,
        role: userData.role,
        content: filterXSS(replayContent),
        createTime: new Date().toString(),
        questioner
      })
      await BlogCommentModel.updateOne(
        {
          _id
        },
        data
      )
      sendSms(data.articleId, userData, replayContent, '文章回复')
    }
    return data
  }
}
