import config from '@/config'
import Axios from './Axios'

let baseURL
if (config.isClient) {
  baseURL = window.__PRELOADED_STATE__.system.appHost
} else {
  baseURL = process.APP_HOST
}
baseURL = `${baseURL}/api/client`
export default new Axios({
  baseURL
})
