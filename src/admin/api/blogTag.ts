import request from '@/utils/request'
import { BlogTag } from '@root/src/models/blogTag'

// 获取博客标签列表
export const getBlogTags = (params: AnyObject = {}) => {
  return request.get<ResponseData<BlogTag[]>>('/blogTags', params)
}

// 获取博客标签详情
export const getBlogTag = (id: string) => {
  return request.get<ResponseData<BlogTag>>(`/blogTag/${id}`)
}

// 新增博客标签
export const addBlogTag = (params: Partial<BlogTag>) => {
  return request.post<ResponseData<BlogTag>>('/blogTag', params)
}

// 编辑博客标签
export const updateBlogTag = (id: string, params: Partial<BlogTag>) => {
  return request.put<ResponseData<BlogTag>>(`/blogTag/${id}`, params)
}

// 删除博客标签
export const deleteBlogTag = (id: string) => {
  return request.delete<ResponseData<BlogTag>>(`/blogTag/${id}`)
}

// 排序博客标签
export const sortBlogTags = (params: AnyObject[]) => {
  return request.put<ResponseData<BlogTag>>(`/blogTags/sort`, params)
}
