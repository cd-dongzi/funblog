import Mongodb from 'utils/mongodb'
import musicModel from 'models/music'

function formatData(data) {
  if (Object.prototype.toString.call(data).slice(8, -1) === 'Array') {
    return data.map(item => {
      return returnData(item)
    })
  } else {
    return returnData(data)
  }

  function returnData(obj) {
    let {
      _id,
      type,
      name,
      author,
      desc,
      releaseTime,
      ali_cover,
      ali_url
    } = obj
    return {
      _id,
      type,
      name,
      author,
      desc,
      releaseTime,
      url: ali_url,
      cover: ali_cover
    }
  }
}

export default {
  async getMusicInfo(ctx, async) {
    log.clientTitle('获取音乐信息')
    const _id = ctx.params.id
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.send()
    }
    let data = await Mongodb.findOne(musicModel, {
      _id
    }, {
      name: 1,
      author: 1,
      ali_cover: 1,
      ali_url: 1,
      releaseTime: 1,
      _id: 1
    })
    data = formatData(data)
    ctx.send(data)
  },

  async getMusics(ctx, next) {
    log.clientTitle('获取音乐列表')
    let {
      type = '', pageindex = 1, pagesize = 5
    } = ctx.request.query
    console.log(type, pageindex, pagesize)
    try {
      const reg = new RegExp(type, 'i')
      let data = await Mongodb.find(musicModel, {
        isVisible: true,
        $or: [{
          type: {
            $regex: reg
          }
        }],
      }, {
        type: 1,
        name: 1,
        author: 1,
        ali_cover: 1,
        desc: 1,
        releaseTime: 1,
        ali_url: 1,
        _id: 1,
      }, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize,
        sort: {
          level: -1,
          updateTime: -1
        }
      })
      data = formatData(data)
      ctx.send(data)
    } catch (err) {
      ctx.sendError(err)
    }
  },

  async getRandomMusics(ctx, next) {
    log.clientTitle('获取随机音乐列表')
    let {
      keyword,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log(keyword, pageindex, pagesize)
    try {
      let re = new RegExp(keyword, 'i')
      let data = await Mongodb.random(musicModel, {
        $or: [{
            type: {
              $regex: re
            }
          },
          {
            name: {
              $regex: re
            }
          },
          {
            author: {
              $regex: re
            }
          }
        ],
        isVisible: true
      }, {
        size: pagesize * 1,
        sort: {
          level: -1,
          createTime: -1
        },
        $project: {
          type: 1,
          name: 1,
          author: 1,
          ali_cover: 1,
          desc: 1,
          releaseTime: 1,
          ali_url: 1,
          _id: 1,
        }
      })
      data = formatData(data)
      return ctx.send(data)
    } catch (e) {
      console.log(e)
      return ctx.sendError(e)
    }
  },

  async getRandomMusicInfo(ctx, next) {
    log.clientTitle('获取一首随机音乐列表')
    let url = ctx.request.query.url
    try {
      let data = await Mongodb.random(musicModel, {
        url: {
          $nin: [url]
        },
        isVisible: true
      }, {
        size: 1,
        $project: {
          name: 1,
          author: 1,
          ali_cover: 1,
          ali_url: 1,
          releaseTime: 1,
          _id: 1
        }
      })
      data = formatData(data)
      return ctx.send(data[0])
    } catch (e) {
      console.log(e)
      return ctx.sendError(e)
    }
  }
}
