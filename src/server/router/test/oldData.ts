import { UserSystemModel } from '@server/models/userSystem'
import { VisitorModel } from '@server/models/visitor'
import { BlogTagModel } from '@server/models/blogTag'
import { BlogModel } from '@server/models/blog'
import { CommentModel } from '@server/models/comment'
import { BlogCommentModel } from '@server/models/blogComment'
import { getLocationByIp, getDataByUa } from '@server/utils/system'
import { CounterModel } from '@server/models/counter'
import { PlayModel } from '@server/models/play'
import rootConfig from '@root/src/shared/config'
import { randNumber } from '@root/src/shared/utils'
import axios from 'axios'
import url from 'url'
import glob from 'glob'
import fse from 'fs-extra'
import db from '@server/database'
import Utils from '@root/build/utils'
import { syncGithub } from '@server/timer'
import md5 from 'md5'
const Address6 = require('ip-address').Address6

const BlogTabModel = db.model<any>(
  'blogtab',
  new db.Schema({
    name: String,
    desc: String,
    icon: String,
    color: String,
    seq: Number,
    createTime: { type: Date, default: Date.now }
  })
)

// 创建用户
const updateUserSystem = async () => {
  await UserSystemModel.create({
    name: '终结者',
    password: md5('123456'),
    username: 'admin',
    roles: ['admin'],
    github: 'https://github.com/cd-dongzi'
  })
}

// 更新游客ipv4
const uodateIpv4ByVisitors = async () => {
  const list = await VisitorModel.find({ ip: { $regex: '::' } })
  const Promises = []
  for (const item of list) {
    const teredo = new Address6(item.ip).inspectTeredo()
    const client4 = teredo.client4
    Promises.push(
      VisitorModel.updateOne(
        {
          _id: item._id
        },
        {
          ip: client4
        }
      )
    )
  }
  await Promise.all(Promises)
}
// 更新游客system
const updateVisitors = async () => {
  const list = await VisitorModel.find()
  const Promises = []
  for (const item of list) {
    const system = getDataByUa(item.userAgent)
    const location = getLocationByIp(item.ip)
    const data: AnyObject = {
      system
    }
    if (location) {
      data.location = location
    }
    Promises.push(
      VisitorModel.updateOne(
        {
          _id: item._id
        },
        data
      )
    )
  }
  await Promise.all(Promises)
}
// 更新博客标签
const updateBlogTags = async () => {
  const list = await BlogTabModel.find()
  const Promises = []
  for (const item of list) {
    const counterData = await CounterModel.findOneAndUpdate({ name: 'blogTag' }, { $inc: { count: 1 } }, { upsert: true, new: true })
    Promises.push(
      BlogTagModel.create({
        name: item.name,
        color: item.color,
        icon: item.icon,
        seq: counterData.count,
        createTime: item.createTime
      })
    )
  }
  await Promise.all(Promises)
  return
}
// 更新博客
const updateBlog = async () => {
  const BlogOnlineModel = db.model<any>(
    'blog_online',
    new db.Schema({
      type: Array,
      title: String,
      desc: String,
      html: String,
      markdown: String,
      level: Number,
      total_nums: Number,
      github: String,
      source: Number,
      isVisible: Boolean,
      updateTime: Date,
      createTime: { type: Date, default: Date.now }
    })
  )
  const list: any = await BlogOnlineModel.find()
  const Promises = []
  for (const item of list) {
    const psArr: any[] = []
    item.type.forEach((t: any) => {
      psArr.push(
        BlogTagModel.findOne({
          name: t
        })
      )
    })
    const arr = await Promise.all(psArr)
    Promises.push(
      BlogModel.create({
        _id: item._id,
        title: item.title,
        tags: arr.map((v) => ({
          name: v.name,
          color: v.color,
          icon: v.icon
        })) as any,
        desc: item.desc,
        github: item.github,
        cover: 'https://img.dzblog.cn/images/blog.jpeg',
        source: item.source === 1 ? '原创' : item.source === 2 ? '转载' : item.source === 3 ? '翻译' : '',
        md: item.markdown ? item.markdown : item.md,
        isVisible: item.isVisible,
        read_nums: item.total_nums || 0,
        updateTime: item.updateTime,
        createTime: item.createTime
      })
    )
  }
  await Promise.all(Promises)
}
// 更新博客留言
const updateBlogComments = async () => {
  const Modal = db.model<any>(
    'blog_online_comment',
    new db.Schema({
      isAuthor: { type: Boolean, default: false },
      articleid: db.Schema.Types.ObjectId,
      sex: String,
      name: String,
      msg: String,
      old_msg: String,
      email: String,
      qq: String,
      wechat: String,
      avatar: String,
      city: String,
      url: String,
      floor: Number,
      reply_list: Array,
      userAgent: String,
      ip: String,
      createTime: { type: Date, default: Date.now }
    })
  )
  const list: any = await Modal.find()
  const createAvatar = () => {
    const num = randNumber(1, 21)
    return `${rootConfig.oss.prefix}avatar/${num}.jpg`
  }
  for (const item of list) {
    const counterData = await CounterModel.findOneAndUpdate(
      { name: `blogComment-${item.articleid}` },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    )
    await BlogCommentModel.create({
      replyList:
        item.reply_list.length > 0
          ? item.reply_list.map((v: any) => {
              return {
                _id: item._id,
                name: v.isAuthor ? 'Charlie' : v.name,
                url: v.url,
                avatar: v.isAuthor ? 'https://img.dzblog.cn/avatar/0.jpg' : `https://img.dzblog.cn/avatar/${v.avatar}.jpg`,
                role: v.isAuthor ? ['admin'] : [],
                content: v.msg,
                createTime: v.createTime,
                questioner: v.questioner
                  ? {
                      name: v.questioner.isAuthor ? 'Charlie' : v.questioner.name,
                      url: v.questioner.url,
                      avatar: v.questioner.isAuthor
                        ? 'https://img.dzblog.cn/avatar/0.jpg'
                        : `https://img.dzblog.cn/avatar/${v.questioner.avatar}.jpg`,
                      role: v.questioner.isAuthor ? ['admin'] : []
                    }
                  : null
              }
            })
          : [],
      role: item.isAuthor ? ['admin'] : [],
      articleId: item.articleid,
      name: item.name,
      avatar: createAvatar(),
      content: item.msg,
      url: item.url,
      floor: counterData.count,
      createTime: item.createTime
    })
  }
}
// 同步留言数量
const updateSyncBlogCommentsNums = async () => {
  const list = await BlogModel.find()
  const Promises = []
  for (const item of list) {
    const count = await BlogCommentModel.find({ articleId: item._id }).countDocuments()
    Promises.push(
      BlogModel.updateOne(
        {
          _id: item._id
        },
        {
          comment_nums: count
        }
      )
    )
  }
  await Promise.all(Promises)
  return
}
// 更新留言及楼层
const updateComments = async () => {
  const LeaveMessageModel = db.model<any>(
    'leave_message',
    new db.Schema({
      isAuthor: { type: Boolean, default: false },
      sex: String,
      name: String,
      msg: String,
      old_msg: String,
      email: String,
      qq: String,
      wechat: String,
      avatar: String,
      city: String,
      url: String,
      floor: Number,
      reply_list: Array,
      userAgent: String,
      ip: String,
      createTime: { type: Date, default: Date.now }
    })
  )
  const list = await LeaveMessageModel.find()
  const max = Math.max(...list.map((item) => item.floor))
  await CounterModel.findOneAndUpdate(
    { name: 'comment' },
    {
      count: max
    }
  )
  const createAvatar = () => {
    const num = randNumber(1, 21)
    return `${rootConfig.oss.prefix}avatar/${num}.jpg`
  }
  for (const item of list) {
    if (!item.old_msg) {
      continue
    }
    await CommentModel.create({
      replyList:
        item.reply_list.length > 0
          ? item.reply_list.map((v: any) => {
              return {
                _id: item._id,
                name: v.isAuthor ? 'Charlie' : v.name,
                url: v.url,
                avatar: v.isAuthor ? 'https://img.dzblog.cn/avatar/0.jpg' : `https://img.dzblog.cn/avatar/${v.avatar}.jpg`,
                role: v.isAuthor ? ['admin'] : [],
                content: v.msg,
                createTime: v.createTime,
                questioner: v.questioner
                  ? {
                      name: v.questioner.isAuthor ? 'Charlie' : v.questioner.name,
                      url: v.questioner.url,
                      avatar: v.questioner.isAuthor
                        ? 'https://img.dzblog.cn/avatar/0.jpg'
                        : `https://img.dzblog.cn/avatar/${v.questioner.avatar}.jpg`,
                      role: v.questioner.isAuthor ? ['admin'] : []
                    }
                  : null
              }
            })
          : [],
      role: item.isAuthor ? ['admin'] : [],
      name: item.name,
      avatar: createAvatar(),
      content: item.old_msg,
      floor: item.floor,
      createTime: item.createTime,
      url: item.url
    })
  }
}

// 大杂烩
const updatePlays = async (ctx: any) => {
  const ExampleModel = db.model<any>(
    'example',
    new db.Schema({
      title: String,
      name: String,
      type: Array,
      filetype: String,
      desc: String,
      level: Number,
      url: String,
      source: Number,
      github: String,
      download_num: { type: Number, default: 0 },
      isVisible: Boolean,
      updateTime: { type: Date, default: Date.now },
      createTime: { type: Date, default: Date.now }
    })
  )
  const list = await ExampleModel.find()

  for (const item of list) {
    const psArr: any[] = []
    item.type.forEach((t: any) => {
      psArr.push(
        BlogTagModel.findOne({
          name: t
        })
      )
    })
    const arr = (await Promise.all(psArr)).filter((v) => v)
    let folder: string[] = []
    try {
      fse.moveSync(Utils.resolve('public/cases'), Utils.resolve('public/play/files'), {
        overwrite: true
      })
    } catch (e) {}
    const appHost = `${ctx.protocol}://${ctx.host}`
    if (item.filetype === 'folder') {
      const downloadPath = new url.URL(item.url).pathname.replace('/cases', '/play/files')
      const files = glob.sync(Utils.resolve(`public${downloadPath.split('/').slice(0, -1).join('/')}/**/*.*`)).map((file) => {
        const prefix = `${Utils.realpath}/public`
        const index = file.indexOf(prefix)
        return `${appHost}${file.slice(index + prefix.length)}`
      })
      folder = files
    }
    item.url = item.url.replace('http://dzblog.cn/cases/', `${appHost}/play/files/`)
    await PlayModel.create({
      tags: arr.map((v) => ({
        name: v.name,
        color: v.color,
        icon: v.icon
      })) as any,
      title: item.title,
      desc: item.desc,
      fileType: item.filetype,
      source: item.source === 1 ? '原创' : item.source === 2 ? '转载' : item.source === 3 ? '翻译' : '',
      isVisible: item.isVisible,
      cover: 'https://img.dzblog.cn/images/blog.jpeg',
      url: item.url,
      createTime: item.createTime,
      file: item.filetype === 'file' ? item.url : '',
      folder,
      download_nums: item.download_num,
      __v: 0
    })
  }
}

// 同步Github
const updateGithubs = async () => {
  await syncGithub()
}

// 更新
const updateDemo = (router: any) => {
  router.get('/update/demo', async (ctx: any, next: any) => {
    axios
      .get('https://api.github.com/users/cd-dongzi')
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
    // const gh = new GitHub({
    //   username: '15273119291@163.com',
    //   password: 'chendong19951106'
    // })
    // const me = gh.getUser('cd-dongzi')
    // me.listStarredRepos().then(function ({ data: reposJson }: any) {
    //   console.log(`clayreimann has ${reposJson.length} repos!`, reposJson)
    // })

    // ctx.send(me)

    // check our rate-limit status
    // since we're unauthenticated the limit is 60 requests per hour
    // gh.getRateLimit()
    //   .getRateLimit()
    //   .then(function (resp: any) {
    //     console.log('Limit remaining: ' + resp.data.rate.remaining)
    //     // date constructor takes epoch milliseconds and we get epoch seconds
    //     console.log('Reset date: ' + new Date(resp.data.rate.reset * 1000))
    //   })
    //   .catch(function (error: any) {
    //     console.log('Error fetching rate limit', error.message)
    //   })
  })
}

export default (router: any) => {
  // blog_commments 更名 blog_online_comments
  // blogs 更名 blog_onlines
  // user表删除
  // 添加Canavs跟SVG标签
  router.get('/update/all', async (ctx: any, next: any) => {
    await updateBlogTags()
    await updateBlog()
    await updateBlogComments()
    await updateUserSystem()
    await updateVisitors()
    await uodateIpv4ByVisitors()
    await updateComments()
    await updatePlays(ctx)
    ctx.send('ok')
  })
  router.get('/update/userSystem', async (ctx: any, next: any) => {
    await updateUserSystem()
    ctx.send('ok')
  })
  router.get('/update/blogTags', async (ctx: any, next: any) => {
    await updateBlogTags()
    ctx.send('ok')
  })
  router.get('/update/blogs', async (ctx: any, next: any) => {
    await updateBlog()
    ctx.send('ok')
  })
  router.get('/update/blogComments', async (ctx: any, next: any) => {
    await updateBlogComments()
    ctx.send('ok')
  })
  router.get('/update/syncBlogCommentsNums', async (ctx: any, next: any) => {
    await updateSyncBlogCommentsNums()
    ctx.send('ok')
  })
  router.get('/update/visitors/system', async (ctx: any, next: any) => {
    await updateVisitors()
    ctx.send('ok')
  })
  router.get('/update/visitors/ipv4', async (ctx: any, next: any) => {
    await uodateIpv4ByVisitors()
    ctx.send('ok')
  })
  router.get('/update/comments', async (ctx: any, next: any) => {
    await updateComments()
    ctx.send('ok')
  })
  router.get('/update/plays', async (ctx: any, next: any) => {
    await updatePlays(ctx)
    ctx.send('ok')
  })
  router.get('/update/githubs', async (ctx: any, next: any) => {
    await updateGithubs()
    ctx.send('ok')
  })
  updateDemo(router)
}
