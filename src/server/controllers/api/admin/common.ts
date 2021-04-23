import { Controller, Get, Middleware } from '@server/decorators'
import { VisitorModel } from '@server/models/visitor'
import { UserModel } from '@server/models/user'
import { BlogModel } from '@server/models/blog'
import { CommentModel } from '@server/models/comment'
import authTokenMiddleware from '@server/middleware/authToken'

@Controller('/admin')
@Middleware([authTokenMiddleware()])
export default class AdminCommonController {
  // 获取游客人数
  @Get('/common/visitors/count')
  async getVisitorsCount() {
    return await VisitorModel.find().countDocuments()
  }

  // 获取登录人数
  @Get('/common/users/count')
  async getUsersCount() {
    return await UserModel.find().countDocuments()
  }

  // 获取文章数量
  @Get('/common/blogs/count')
  async getBlogsCount() {
    return await BlogModel.find().countDocuments()
  }

  // 获取留言数量
  @Get('/common/comments/count')
  async getCommentsCount() {
    return await CommentModel.find().countDocuments()
  }

  // 获取系统参数
  @Get('/common/systemParams')
  async getSystemParams() {
    const [users, visitors] = await Promise.all([
      UserModel.find({}, { system: 1, location: 1, _id: 0 }),
      VisitorModel.find({}, { system: 1, location: 1, _id: 0 })
    ])

    const setVal = (key: string, attr: string, system: AnyObject, obj: AnyObject) => {
      if (!system[key]) {
        return obj
      }
      const val = system[key][attr]
      if (val) {
        if (obj[key][val]) {
          obj[key][val]++
        } else {
          obj[key][val] = 1
        }
      }
      return obj
    }
    return [...users, ...visitors].reduce(
      (obj, item) => {
        setVal('browser', 'name', item.system, obj)
        setVal('engine', 'name', item.system, obj)
        setVal('os', 'name', item.system, obj)
        setVal('device', 'model', item.system, obj)
        setVal('location', 'city', item.system, obj)
        const city = item.location && item.location.city
        if (city && city !== '0') {
          if (obj.location.city[city]) {
            obj.location.city[city]++
          } else {
            obj.location.city[city] = 1
          }
        }
        return obj
      },
      {
        browser: {},
        engine: {},
        os: {},
        device: {},
        location: {
          city: {}
        }
      } as {
        browser: AnyObject
        engine: AnyObject
        os: AnyObject
        device: AnyObject
        location: AnyObject
      }
    )
  }
}
