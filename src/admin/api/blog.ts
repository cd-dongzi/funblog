import request from '@/utils/request'
import { Blog } from '@root/src/models/blog'
/* 博客 */
// 新增博客
export const addBlog = (params: FormData) => {
  return request.post<ResponseData<Blog>>('/blog', params, {
    'Content-Type': 'multipart/form-data'
  })
}

// 获取博客详情
export const getBlog = (id: string) => {
  return request.get<ResponseData<Blog>>(`/blog/${id}`)
}

// 获取博客分页
export const getBlogs = (params: AnyObject = {}) => {
  return request.get<ResponseList<Blog>>('/blogs', params)
}

// 编辑博客
export const updateBlog = (id: string, params: FormData) => {
  return request.put<ResponseData<Blog>>(`/blog/${id}`, params, {
    'Content-Type': 'multipart/form-data'
  })
}

// 删除博客
export const deleteBlog = (id: string) => {
  return request.delete<ResponseData<Blog>>(`/blog/${id}`)
}
