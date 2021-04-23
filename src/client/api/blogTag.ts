import request from '@/utils/request'
import { BlogTag } from '@root/src/models/blogTag'

// 博客标签
export const getBlogTags = () => {
  return request.get<ResponseData<BlogTag[]>>('/blogTags')
}
