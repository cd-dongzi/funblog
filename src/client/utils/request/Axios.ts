import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import https from 'https'
import { notification } from '@/components'
import rootConfig from '@root/src/shared/config'
import { Cookie } from '@/utils/cache'
const DEFAULT_ERROR_MSG = '服务器繁忙，请稍后再试~'

class Axios {
  config: AxiosRequestConfig
  axios: AxiosInstance;
  [rootConfig.loginTokenKey] = ''

  constructor(config: AxiosRequestConfig) {
    this.config = config
    this.axios = this.createAxios(config)
  }

  createAxios(config: AxiosRequestConfig) {
    const { timeout = 30000, ...requestData } = config
    const service = axios.create({
      timeout,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      ...requestData
    })
    // 发送请求
    service.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error)
    )
    // 响应请求
    service.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(error)
    )
    return service
  }

  request<T extends ResponseData>(method: Method, url: string, data: any, config: AxiosRequestConfig): Promise<T> {
    const q = method === 'GET' ? 'params' : 'data'
    const headers: AnyObject = {
      'Content-Type': 'application/json',
      ...config
    }
    const key = process.env.BROWSER_ENV ? Cookie.get(rootConfig.loginTokenKey) : this[rootConfig.loginTokenKey]
    if (key) {
      headers[rootConfig.loginTokenKey] = key
    }
    return this.axios({
      method,
      url,
      [q]: data,
      headers
    })
      .then(this.checkStatus)
      .then(this.checkCode)
      .catch(this.onError)
  }
  checkStatus<T>(res: AxiosResponse<T>) {
    if (res.status === 200 || res.status === 304) {
      return res.data
    }
    throw DEFAULT_ERROR_MSG
  }

  checkCode<T extends ResponseData>(res: T) {
    // 报错
    if (res.code !== 0) {
      if (res.message) {
        notification.error(res.message)
        throw res.message
      }
    }
    return res
  }
  onError(error: AxiosError) {
    throw error
  }

  get<T extends ResponseData>(url: string, data?: any, config = {}) {
    return this.request<T>('GET', url, data, config)
  }
  post<T extends ResponseData>(url: string, data?: any, config = {}) {
    return this.request<T>('POST', url, data, config)
  }
  put<T extends ResponseData>(url: string, data?: any, config = {}) {
    return this.request<T>('PUT', url, data, config)
  }
  del<T extends ResponseData>(url: string, data?: any, config = {}) {
    return this.request<T>('DELETE', url, data, config)
  }
  patch<T extends ResponseData>(url: string, data?: any, config = {}) {
    return this.request<T>('PATCH', url, data, config)
  }
}

export default Axios
