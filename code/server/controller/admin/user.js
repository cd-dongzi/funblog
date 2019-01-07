import Mongodb from 'utils/mongodb'
import userModel from 'models/admin/user'
import jwt from 'jsonwebtoken'
import config from 'config'

export default {
  // 登陆
  async login(ctx, async) {
    log.adminTitle('登陆请求')
    let {
      username,
      pwd
    } = ctx.request.body
    console.log(username, pwd)
    const res = await Mongodb.findOne(userModel, {
      username: username
    })
    if (!res) {
      return ctx.sendError('用户名不存在！');
    }
    if (pwd !== res.pwd) {
      return ctx.sendError('密码错误,请重新输入！');
    }
    const payload = {
      _id: res._id,
      username: res.username,
      name: res.name,
      roles: res.roles
    }
    const token = jwt.sign(payload, config.auth.admin_secret, {
      expiresIn: '24h'
    }) //token签名 有效期为24小时
    ctx.cookies.set(config.auth.tokenKey, token, {
      httpOnly: false, // 是否只用于http请求中获取
    })
    // ctx.cookies.set('a','1', {         
    //         // secure: '', // 安全 cookie   默认false，设置成true表示只有 https可以访问
    //         // domain:'localhost', // 写cookie所在的域名
    //         // path:'/',       // 写cookie所在的路径
    //         // maxAge: 2*60*60*1000,   // 一个数字表示从 Date.now() 得到的毫秒数
    //         // expires:new Date('2018-02-08'), // cookie失效时间
    //         // httpOnly:false,  // 是否只用于http请求中获取
    //         overwrite:false  // 是否允许重写
    // })
    ctx.send()
  },

  // 获取用户信息
  async getUserInfo(ctx, async) {
    log.adminTitle('获取用户信息')
    const token = ctx.params.token
    let tokenInfo = jwt.verify(token, config.auth.admin_secret);
    console.log(tokenInfo)
    ctx.send({
      username: tokenInfo.username,
      name: tokenInfo.name,
      _id: tokenInfo._id,
      roles: tokenInfo.roles
    })
  },

  //获取用户列表
  async getUsers(ctx, next) {
    log.adminTitle('获取用户信息列表接口')
    let {
      keyword,
      pageindex = 1,
      pagesize = 10
    } = ctx.request.query
    console.log('keyword:' + keyword + ',' + 'pageindex:' + pageindex + ',' + 'pagesize:' + pagesize)
    try {
      const reg = new RegExp(keyword, 'i')
      const res = await Mongodb.findPage(userModel, {
        $or: [{
            name: {
              $regex: reg
            }
          },
          {
            username: {
              $regex: reg
            }
          }
        ]
      }, {
        pwd: 0
      }, {
        limit: pagesize * 1,
        skip: (pageindex - 1) * pagesize
      })
      ctx.send(res)
    } catch (err) {
      console.log(err)
      ctx.sendError(e)
    }
  },

  async addUser(ctx, next) {
    log.adminTitle('添加用户')
    const params = ctx.request.body
    try {
      const data = await Mongodb.findOne(userModel, {
        name: params.name
      })
      if (data) {
        ctx.sendError('数据已经存在, 请重新添加!')
      } else {
        await Mongodb.create(userModel, params);
        ctx.send()
      }
    } catch (e) {
      ctx.sendError(e)
    }
  },

  // 更新用户信息
  async updateUser(ctx, next) {
    log.adminTitle('更新用户')
    const _id = ctx.params.id
    const params = ctx.request.body
    try {
      params.updateTime = Date.now()
      await Mongodb.update(userModel, {
        _id
      }, params)
      ctx.send()
    } catch (e) {
      if (e === '暂无数据') {
        ctx.sendError(e)
      }
    }
  },

  async delUser(ctx, next) {
    log.adminTitle('删除用户')
    const _id = ctx.params.id
    try {
      await Mongodb.remove(userModel, {
        _id
      })
      ctx.send()
    } catch (e) {
      ctx.sendError(e)
    }
  }
}