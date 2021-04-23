import config from '@/config'
import Axios from './Axios'

export default new Axios({
  baseURL: config.isProd ? '/api/admin' : '/admin_api'
})
