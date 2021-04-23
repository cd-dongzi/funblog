import { User } from '@root/src/models/user'
import request from '@/utils/request'

// 获取用户详情
export const getUserInfo = (params?: AnyObject) => {
  return request.get<ResponseData<User>>('/user/info/token', params)
}

// 登录
export const login = (params: Partial<User>) => {
  return request.post<ResponseData<User>>('/user/login', params)
}

// 登出
export const logout = () => {
  return request.post<ResponseData<any>>('/user/logout')
}

// 更新用户
export const updateUser = (id: string, params: Partial<User>) => {
  return request.put<ResponseData<User>>(`/user/${id}`, params)
}
