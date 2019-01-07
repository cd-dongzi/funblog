import Mongodb from 'utils/mongodb'
import musicModel from 'models/music'
import File from 'utils/file'
import path from 'path'
import {
  del
} from 'utils/oss/ali-oss'


export default {
  // 获取音乐信息
  async getMusicInfo(ctx, async) {
    log.adminTitle('获取音乐信息')
    const _id = ctx.params.id
    const data = await Mongodb.findOne(musicModel, {
      _id
    })
    console.log(data)
  },

  //获取音乐列表
  async getMusics(ctx, next) {
    log.adminTitle('获取音乐信息列表接口')
    let {
      keyword,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const reg = new RegExp(keyword, 'i')
      const res = await Mongodb.findPage(musicModel, {
        $or: [{
            name: {
              $regex: reg
            }
          },
          {
            author: {
              $regex: reg
            }
          },
          {
            type: {
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

  async addMusic(ctx, next) {
    log.adminTitle('添加音乐')
    try {
      const fileObj = await File.uploadFile(ctx, {
        filePath: $publicPath,
        dir: 'music'
      })
      fileObj.type = fileObj.type.split(',')
      console.log(fileObj)
      const data = await Mongodb.findOne(musicModel, {
        name: fileObj.name
      })
      if (data) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        let data = await Mongodb.create(musicModel, fileObj)
        ctx.send(fileObj)
      }
    } catch (err) {
      ctx.sendError(err)
    }
  },

  // 更新音乐信息
  async updateMusic(ctx, next) {
    log.adminTitle('更新音乐')
    const _id = ctx.params.id
    try {
      let data = await Mongodb.findOne(musicModel, {
        _id
      })
      console.log(data)
      const fileObj = await File.uploadFile(ctx, {
        filePath: $publicPath,
        dir: 'music'
      })
      fileObj.type = fileObj.type.split(',')
      fileObj.updateTime = Date.now()
      console.log(fileObj)
      await Mongodb.update(musicModel, {
        _id
      }, fileObj)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async delMusic(ctx, next) {
    log.adminTitle('删除音乐')
    const _id = ctx.params.id
    try {
      const {
        url,
        cover,
        ali_url,
        ali_cover
      } = await Mongodb.findOne(musicModel, {
        _id
      })
      ali_url && await del(ali_url)
      ali_cover && await del(ali_cover)
      await File.deleteFile(url)
      await File.deleteFile(cover)
      await Mongodb.remove(musicModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
