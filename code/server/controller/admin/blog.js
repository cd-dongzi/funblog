import Mongodb from 'utils/mongodb'
import blogModel from 'models/blog'
import File from 'utils/file'
import path from 'path'
import marked from 'marked'
import highlight from 'highlight.js'

marked.setOptions({
  renderer: new marked.Renderer(),
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
  //获取博客列表
  async getBlogs(ctx, next) {
    log.adminTitle('获取博客信息列表接口')
    let {
      keyword,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const reg = new RegExp(keyword, 'i')
      const res = await Mongodb.findPage(blogModel, {
        $or: [{
            type: {
              $regex: reg
            }
          },
          {
            title: {
              $regex: reg
            }
          }
        ]
      }, null, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize,
        sort: {
          level: -1,
          updateTime: -1
        }
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(e)
    }
  },

  async addBlog(ctx, next) {
    log.adminTitle('添加博客')
    try {
      const params = ctx.request.body
      const info = await Mongodb.findOne(blogModel, {
        title: params.title
      })
      if (info) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        params.html = marked(params.html);
        const data = await Mongodb.create(blogModel, params)
        ctx.send(params)
      }
    } catch (err) {
      ctx.sendError(err)
    }
  },

  // 更新博客信息
  async updateBlog(ctx, next) {
    log.adminTitle('更新博客')
    const _id = ctx.params.id
    const params = ctx.request.body
    try {
      params.updateTime = Date.now()
      params.html = marked(params.html);
      await Mongodb.update(blogModel, {
        _id
      }, params)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async delBlog(ctx, next) {
    log.adminTitle('删除博客')
    const _id = ctx.params.id
    try {
      console.log(_id)
      return
      await Mongodb.remove(blogModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
