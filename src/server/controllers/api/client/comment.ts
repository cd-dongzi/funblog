import { CommentModel } from '@server/models/comment'
import { CounterModel } from '@server/models/counter'
import { Body, Controller, Get, Post, Put, Query, Token } from '@server/decorators'
import { filterXSS } from '@root/src/shared/utils/xss'
import sms from '@server/utils/sms'
import { formatQueryByList, getDataByPage } from '../utils'
import ClientUserController from './user'

@Controller('/client')
export default class ClientCommentController {
  // 获取留言
  @Get('/comments')
  async getCommentsPage(@Query() que: any) {
    const query = formatQueryByList(que)
    query.projection = {
      ...query.projection,
      userId: 0
    }
    const data = await getDataByPage(query, CommentModel)
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

  // 添加
  @Post('/comment')
  async addComment(@Body('content', true) content: string, @Token() token: string) {
    const data = await new ClientUserController().getUserInfoByToken(token)
    if (data) {
      const counterData = await CounterModel.findOneAndUpdate({ name: 'comment' }, { $inc: { count: 1 } }, { upsert: true, new: true })
      await CommentModel.create({
        userId: data._id,
        name: data.name,
        avatar: data.avatar,
        url: data.url,
        role: data.role,
        content: filterXSS(content),
        floor: counterData.count
      })
      sms.sendSmsByComment({
        title: '',
        type: '留言板留言',
        name: data.name,
        msg: content
      })
    }
  }

  // 回复
  @Put('/comment/reply')
  async replyComment(@Body() body: AnyObject, @Token() token: string) {
    const { questioner, _id, replayContent } = body
    const userData = await new ClientUserController().getUserInfoByToken(token)
    const data = await CommentModel.findById(_id)
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
      await CommentModel.updateOne(
        {
          _id
        },
        data
      )
      sms.sendSmsByComment({
        title: data.content,
        type: '留言板回复',
        name: data.name,
        msg: replayContent
      })
    }
  }
}
