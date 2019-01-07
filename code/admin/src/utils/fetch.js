import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'


axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})

axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))

function checkStatus(res) {
    if (res.status === 200 || res.status === 304) {
        return res.data
    }
    return {
        code: 0,
        msg: res.data.msg || res.statusText,
        data: res.statusText
    }
    return res
}

function checkCode(res) {
    if (res.code === 0) {
        Message({
          message: res.msg,
          type: 'error',
          duration: 2 * 1000
        })

        throw new Error(res.msg)
        // return 
    }
    
    return res
}
let prefix = process.env.NODE_ENV === 'production' ? location.host === 'localhost:3000' ? 'http://localhost:3000/admin_api/' : 'http://localhost:3000/admin_api/' : '/admin_api/';
export default {
    get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url: prefix + url,
            params,
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    post(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            data: qs.stringify(data),
            timeout: 30000
        }).then(checkStatus).then(checkCode)
    },
    postFile(url, data) {
        if (!url) return
        return axios({
            method: 'post',
            url: prefix + url,
            data: data,
        }).then(checkStatus).then(checkCode)
    }
}
