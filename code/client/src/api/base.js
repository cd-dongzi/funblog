import axios from '@/utils/axios'
const isProd = process.env.NODE_ENV === 'production'
const isAppProd = process.env.app_config_env === 'prod'
import config from '@/config'

export default class Base {
    static baseUrl = config.app.baseUrl
    static get = axios.get.bind(axios) // 获取
    static post = axios.post.bind(axios) // 添加
    static put = axios.put.bind(axios) // 更新
    static patch = axios.patch.bind(axios) // 更新
    static delete = axios.delete.bind(axios) // 删除
}