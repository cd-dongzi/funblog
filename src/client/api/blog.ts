import request from '@/utils/request'
import { Blog, BlogSub } from '@root/src/models/blog'

// 博客列表分页
export const getBlogSubPage = (params?: ApiParamsList<AnyObject>) => {
  return request.get<ResponseList<BlogSub>>('/blog/blogSub/page', params)
}

// 热门博客列表
export const getHotBlogSubPage = (params?: AnyObject) => {
  return request.get<ResponseList<BlogSub>>('/blog/hotBlogSubs', params)
}

// 最新博客列表
export const getLatestBlogSubPage = (params?: AnyObject) => {
  return request.get<ResponseList<BlogSub>>('/blog/latestBlogSubs', params)
}

// 博客搜索
export const getBlogSubPageBySearch = (params?: ApiParamsList<AnyObject>) => {
  return request.get<ResponseList<BlogSub>>('/blog/blogSub/search', params)
}

// 博客详情
export const getBlogInfo = (id: string) => {
  return request.get<ResponseData<Blog>>('/blog/' + id)
}

// 博客点赞
export const updateLikeByBlog = (id: string) => {
  return request.put<ResponseData<number>>(`/blog/${id}/like`)
}

// 获取归档时间
export const getArchiveTimes = () => {
  return request.get<ResponseData<Record<number, number[]>>>('/blogs/archive/times')
}

// 获取归档时间
export const getArchiveBlogs = (params: AnyObject) => {
  return request.get<ResponseList<BlogSub>>('/blogs/archive/blogs', params)
}
