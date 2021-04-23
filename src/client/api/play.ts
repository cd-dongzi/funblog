import { Play } from '@root/src/models/play'
import request from '@/utils/request'

// 获取实例分页
export const getPlays = (params: AnyObject = {}) => {
  return request.get<ResponseList<Play>>('/plays', params)
}

// 下载实例
export const downloadPlay = (id: string) => {
  return `${request.config.baseURL}/play/download/${id}`
}
