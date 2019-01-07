import Mongodb from 'utils/mongodb'
import musicTabModel from 'models/musicTab'

export default {
  //获取博客标签列表
  async getMusicTabs(ctx, next) {
    log.clientTitle('获取音乐标签信息列表接口')
    try {
      const res = await Mongodb.find(musicTabModel, null, {
        total: 1,
        name: 1,
        color: 1,
        icon: 1,
        _id: 0
      }, {
        sort: {
          total: -1
        }
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(e)
    }
  }
}
