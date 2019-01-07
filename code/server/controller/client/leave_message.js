import Mongodb from 'utils/mongodb'
import leaveMessageModel from 'models/client/leave_message'
import {
  get_client_ip
} from 'utils/system'
import {
  formatMessage
} from 'utils/format'
import {
  sendMeSMS
} from 'utils/sms/sms_ali.js'

import marked from 'marked'
import highlight from 'highlight.js'
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true, //允许 Git Hub标准的markdown.
  tables: true, //允许支持表格语法。该选项要求 gfm 为true。
  breaks: true, //允许回车换行。该选项要求 gfm 为true。
  pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
  smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
  smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
  highlight: function (code) {
    return highlight.highlightAuto(code).value
  }
})

export default {
  //获取对我的留言列表
  async getLeaveMessages(ctx, next) {
    log.clientTitle('获取对我的留言信息列表接口')
    let {
      pageindex = 1, pagesize = 10
    } = ctx.request.query
    console.log('pageindex:' + pageindex + ',pagesize:' + pagesize)

    try {
      let data = await Mongodb.findPage(leaveMessageModel, null, {
        _id: 1,
        name: 1,
        msg: 1,
        url: 1,
        avatar: 1,
        floor: 1,
        isAuthor: 1,
        reply_list: 1,
        createTime: 1
      }, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize
      })
      data.list = formatMessage(data.list)
      return ctx.send(data)
    } catch (err) {
      return ctx.sendError(err)
    }

  },

  // 添加对我的留言
  async addLeaveMessage(ctx, next) {
    log.clientTitle('添加对我的留言')
    const userAgent = ctx.request.headers['user-agent'],
      ip = get_client_ip(ctx),
      params = ctx.request.body
    const data = Object.assign({}, {
      userAgent,
      ip
    }, params)
    data.old_msg = data.msg
    data.msg = marked(params.msg)
    let floor = await Mongodb.getCount(leaveMessageModel)
    data.floor = ++floor

    sendMeSMS(JSON.stringify({
      title: '我的留言',
      type: 'me',
      name: data.name,
      msg: data.old_msg
    }))
    try {
      await Mongodb.create(leaveMessageModel, data)
      return ctx.send()
    } catch (err) {
      return ctx.sendError(err)
    }
  },

  // 更新对我的留言
  async updateLeaveMessage(ctx, next) {
    log.clientTitle('更新对我的留言')
    const params = ctx.request.body
    const _id = ctx.params.id
    console.log(params)
    params.msg = marked(params.msg)
    try {
      const res = await Mongodb.findOne(leaveMessageModel, {
        _id
      })
      res.reply_list.push(params)
      await Mongodb.update(leaveMessageModel, {
        _id
      }, res)
      ctx.send()
    } catch (err) {
      return ctx.sendError(err)
    }
  }
}
