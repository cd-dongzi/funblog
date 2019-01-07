import Mongodb from 'utils/mongodb'
import exampleModel from 'models/example'
import File from 'utils/file'
import path from 'path'
export default {
  // 获取示例信息
  async getExampleInfo(ctx, async) {
    log.adminTitle('获取示例信息')
    const _id = ctx.params.id
    const data = await Mongodb.findOne(exampleModel, {
      _id
    })
    console.log(data)
  },

  //获取示例列表
  async getExamples(ctx, next) {
    log.adminTitle('获取示例信息列表接口')
    let {
      keyword,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const reg = new RegExp(keyword, 'i')
      const res = await Mongodb.findPage(exampleModel, {
        $or: [{
            name: {
              $regex: reg
            }
          },
          {
            desc: {
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

  // 添加示例
  async addExample(ctx, next) {
    log.adminTitle('添加示例')
    const {
      type
    } = ctx.params
    try {
      let fileObj,
        params = {
          filePath: $publicPath,
          dir: 'example',
          type: 'date'
        }
      if (type === 'file') {
        fileObj = await File.uploadFile(ctx, params)
      } else if (type === 'folder') {
        fileObj = await File.uploadFolder(ctx, params)
      }
      fileObj.type = fileObj.type.split(',')
      console.log(fileObj)
      let data = await Mongodb.create(exampleModel, fileObj)
      ctx.send(fileObj)
    } catch (err) {
      ctx.sendError(err)
    }
  },

  // 更新示例信息
  async updateExample(ctx, next) {
    log.adminTitle('更新示例')
    const {
      id: _id,
      type
    } = ctx.params
    try {
      let fileObj,
        params = {
          filePath: $publicPath,
          dir: 'example',
          type: 'date'
        }
      if (type === 'file') {
        fileObj = await File.uploadFile(ctx, params)
      } else if (type === 'folder') {
        fileObj = await File.uploadFolder(ctx, params)
      }
      fileObj.type = fileObj.type.split(',')
      fileObj.updateTime = Date.now()
      console.log(fileObj)
      await Mongodb.update(exampleModel, {
        _id
      }, fileObj)
      ctx.send()
    } catch (err) {
      ctx.sendError(err)
    }
  },

  async delExample(ctx, next) {
    log.adminTitle('删除示例')
    const _id = ctx.params.id
    try {
      const {
        url,
        filetype
      } = await Mongodb.findOne(exampleModel, {
        _id
      })
      if (filetype === 'file') {
        File.deleteFile(url)
      } else if (filetype === 'folder') {
        File.deleteFolder(url)
      }
      await Mongodb.remove(exampleModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
