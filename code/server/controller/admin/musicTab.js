import Mongodb from 'utils/mongodb'
import musicTabModel from 'models/musicTab'

export default {
  //获取音乐标签列表
  async getMusicTabs(ctx, next) {
    log.adminTitle('获取音乐标签信息列表接口')
    try {
      const res = await Mongodb.find(musicTabModel, null, null, {
        sort: {
          total: -1
        }
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(err)
    }
  },

  async addMusicTab(ctx, next) {
    log.adminTitle('添加音乐标签')
    try {
      const params = ctx.request.body
      const info = await Mongodb.findOne(musicTabModel, {
        name: params.name
      })
      if (info) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        const data = await Mongodb.create(musicTabModel, params)
        ctx.send(params)
      }
    } catch (err) {
      ctx.sendError(err)
    }
  },

  // 更新音乐标签信息
  async updateMusicTab(ctx, next) {
    log.adminTitle('更新音乐标签')
    const _id = ctx.params.id
    const params = ctx.request.body
    try {
      params.updateTime = Date.now()
      await Mongodb.update(musicTabModel, {
        _id
      }, params)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async delMusicTab(ctx, next) {
    log.adminTitle('删除音乐标签')
    const _id = ctx.params.id
    try {
      await Mongodb.remove(musicTabModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}
