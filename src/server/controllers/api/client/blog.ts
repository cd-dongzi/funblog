import { Context } from 'koa'
import { BlogModel } from '@server/models/blog'
import { filterObjByKey, formartMd } from '@root/src/shared/utils'
import { Controller, Ctx, Get, Params, Put, Query } from '@server/decorators'
import dayjs from 'dayjs'
import { BlogLikeModel } from '@server/models/blogLike'
import { getClientIp } from '@server/utils/system'
import { formatQueryByList, getDataByPage, FormatQueryByListReturnType } from '../utils'
import { getTokenInfo } from './utils'

const aggregate = async (query: FormatQueryByListReturnType) => {
  const { page = 1, size = 10 } = query.params
  let list = await BlogModel.aggregate([
    { $match: query.filter },
    {
      $sort: query.options.sort || {
        createTime: -1
      }
    },
    { $skip: (page - 1) * size },
    { $limit: size },
    // {
    //   $lookup: {
    //     from: 'blog_comments',
    //     localField: '_id',
    //     foreignField: 'articleId',
    //     as: 'comment_nums'
    //   }
    // },
    {
      $project: {
        md: 0,
        isVisible: 0,
        __v: 0
      }
    }
  ])
  list = list.map((item) => {
    // item.comment_nums = item.comment_nums.length
    return item
  })
  const total = await BlogModel.find(query.filter).countDocuments()
  return {
    list,
    total,
    totalPages: Math.ceil(total / query.params.size)
  }
}

@Controller('/client')
export default class ClientBlogController {
  // 热门博客
  @Get('/blog/hotBlogSubs')
  async getHotBlogSubs(@Query() que: AnyObject) {
    const query = formatQueryByList(que, {
      options: {
        sort: {
          like_nums: -1,
          createTime: -1
        }
      },
      filter: {
        isVisible: true
      }
    })
    return await getDataByPage(query, BlogModel)
    // return await aggregate(query)
  }

  // 最新博客
  @Get('/blog/latestBlogSubs')
  async getLatestBlogSubs(@Query() que: AnyObject) {
    const query = formatQueryByList(que, {
      filter: {
        isVisible: true
      }
    })
    return await getDataByPage(query, BlogModel)
  }

  // 列表分页
  @Get('/blog/blogSub/page')
  async getBlogSubPage(@Query() que: AnyObject) {
    const query = formatQueryByList(que)
    let filter: AnyObject = {
      isVisible: true
    }
    const tag = query.filter.tag
    // 标签查询
    if (tag) {
      filter = {
        ...filter,
        tags: { $elemMatch: { name: query.filter.tag } }
      }
    }
    return await getDataByPage(
      {
        ...query,
        filter
      },
      BlogModel
    )
  }

  // 关键字搜索
  @Get('/blog/blogSub/search')
  async getBlogSubPageBySearch(@Query() que: AnyObject) {
    const query = formatQueryByList(que)
    let filter: AnyObject = {
      isVisible: true
    }
    const keyword = que.keyword
    const regex = new RegExp(keyword, 'i')
    // 标签查询
    if (keyword) {
      filter = {
        ...filter,
        $or: [{ title: { $regex: regex } }, { source: { $regex: regex } }, { tags: { $elemMatch: { $or: [{ name: { $regex: regex } }] } } }]
      }
    }
    const data = await getDataByPage(
      {
        ...query,
        filter
      },
      BlogModel
    )
    data.list = data.list.map((item) => {
      return filterObjByKey(item, ['md', 'isVisible'])
    })
    return data
  }

  // 博客详情
  @Get('/blog/:id')
  async getBlogInfo(@Params('id') id: string, @Ctx() ctx: Context) {
    try {
      const data = await BlogModel.findOne(
        {
          _id: id
        },
        {
          isVisible: 0,
          __v: 0
        }
      )
      if (!data) {
        return null
      }
      // 是否点赞
      const tokenInfo = getTokenInfo(ctx)
      let hasLike = false
      if (tokenInfo._id) {
        // 用户id判断
        hasLike = !!(await BlogLikeModel.findOne({ userId: tokenInfo._id, articleId: id }))
      } else {
        // ip判断
        const ip = getClientIp(ctx)
        hasLike = !!(await BlogLikeModel.findOne({ ip, articleId: id }))
      }

      // 阅读计数
      this.updateReadByBlog(id)
      return {
        ...filterObjByKey(data, ['md']),
        html: formartMd(data.md),
        // like_nums,
        hasLike
      }
    } catch (e) {
      return null
    }
  }
  // 博客阅读
  @Put('/blog/:id/read')
  async updateReadByBlog(@Params('id') id: string) {
    const data = await BlogModel.findByIdAndUpdate(
      id,
      {
        $inc: { read_nums: 1 }
      },
      {
        new: true
      }
    )
    return data && data.read_nums
  }
  // 博客点赞
  @Put('/blog/:id/like')
  async updateLikeByBlog(@Params('id') id: string, @Ctx() ctx: Context) {
    const params: AnyObject = {}
    try {
      const data = getTokenInfo(ctx)
      params.userId = data._id
    } catch (e) {}
    const ip = getClientIp(ctx)
    if (params.userId) {
      const data = await BlogLikeModel.findOne({
        userId: params.userId,
        articleId: id
      })
      if (data) {
        throw '您已经点过赞了~'
      }
    } else {
      const data = await BlogLikeModel.findOne({
        ip,
        articleId: id
      })
      if (data) {
        throw '您已经点过赞了~'
      }
    }
    await BlogLikeModel.create({
      ...params,
      articleId: id,
      ip
    })
    const count = await BlogLikeModel.find({ articleId: id }).countDocuments()
    await BlogModel.updateOne(
      {
        _id: id
      },
      {
        like_nums: count
      }
    )
    return count
  }

  // 获取博客归档时间
  @Get('/blogs/archive/times')
  async getArchiveTimes() {
    const data = await BlogModel.find(
      {
        isVisible: true
      },
      { createTime: 1, _id: 0 },
      { sort: { createTime: -1 } }
    )
    return data.reduce((obj, item) => {
      const d = dayjs(item.createTime)
      const year = d.year()
      const month = d.month() + 1
      let arr = obj[year]
      if (arr) {
        arr.push(month)
      } else {
        arr = [month]
      }
      obj[year] = Array.from(new Set(arr)).sort((a, b) => a - b)
      return obj
    }, {} as Record<number, number[]>)
  }

  // 获取博客归档文章
  @Get('/blogs/archive/blogs')
  async getArchiveBlogs(@Query('year', true) year: string, @Query('month') month: string, @Query() que: any) {
    let filter: any = {
      createTime: {
        $gte: new Date(dayjs(`${year}-${month}`).startOf('month').format('YYYY-MM-DD HH:mm:ss')),
        $lt: new Date(dayjs(`${year}-${month}`).endOf('month').format('YYYY-MM-DD HH:mm:ss'))
      }
    }
    if (!Number(year)) {
      filter = {}
    } else if (!Number(month)) {
      filter = {
        createTime: {
          $gte: new Date(dayjs(`${year}-1`).startOf('month').format('YYYY-MM-DD HH:mm:ss')),
          $lt: new Date(dayjs(`${year}-12`).endOf('month').format('YYYY-MM-DD HH:mm:ss'))
        }
      }
    }
    const query = formatQueryByList(que, {
      filter: {
        ...filter,
        isVisible: true
      }
    })
    return await aggregate(query)
  }
}
