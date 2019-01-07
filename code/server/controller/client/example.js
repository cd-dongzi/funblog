import Mongodb from 'utils/mongodb'
import exampleModel from 'models/example'
import File from 'utils/file'
import URL from 'url'
import send from 'koa-send'
export default {
  async getExamples(ctx, next) {
    log.clientTitle('获取示例列表')
    let {
      type = '', pageindex = 1, pagesize = 5
    } = ctx.request.query
    console.log(type, pageindex, pagesize)
    try {
      const reg = new RegExp(type, 'i')
      const data = await Mongodb.find(exampleModel, {
        isVisible: true,
        $or: [{
          type: {
            $regex: reg
          }
        }],
      }, {
        title: 1,
        name: 1,
        type: 1,
        desc: 1,
        url: 1,
        source: 1,
        github: 1,
        download_num: 1,
        updateTime: 1,
        _id: 1,
      }, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize,
        sort: {
          level: -1,
          updateTime: -1
        }
      })
      ctx.send(data)
    } catch (err) {
      ctx.sendError(err)
    }
  },

  async downloadExamole(ctx, next) {
    log.clientTitle('下载示例')
    const {
      id
    } = ctx.params
    const data = await Mongodb.findOne(exampleModel, {
      _id: id
    })
    const {
      url,
      filetype
    } = data
    let path = URL.parse(url).path
    if (filetype === 'file') {
      path = `/public${path}`
    } else {
      path = path.split('/').slice(0, -1).join('/')
      path = await File.compressZip(path)
    }
    ctx.attachment(path)
    await send(ctx, path)
    // 下载次数加1
    Mongodb.update(exampleModel, {
      _id: id
    }, {
      $inc: {
        download_num: 1
      }
    })
  }
}