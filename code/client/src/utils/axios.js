import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

axios.defaults.withCredentials = true
axios.interceptors.request.use(config => {
    return config
}, err => {
    return Promise.reject(err)
})
axios.interceptors.response.use(response => response, err => Promise.resolve(err.response))


export default class Axios {
    static timeout = 10000
    // 检查状态码
    static checkStatus(res) {
        if (res.status === 200 || res.status === 304) {
            return res.data
        }
        return {
            code: 0,
            msg: res.data.msg || res.statusText,
            data: res.statusText
        }
    }

    // 检查code
    static checkCode(res) {
        if (res.code === 0) {
            throw new Error(res.msg)
        }
        return res
    }


    static get(url, params) {
        if (!url) return
        return axios({
            method: 'get',
            url,
            params,
            timeout: this.timeout
        }).then(this.checkStatus).then(this.checkCode)
    }
    static post(url, data, type) {
        if (!url) return
        return axios({
            method: 'post',
            url,
            data: type ? data : qs.stringify(data),
            timeout: this.timeout
        }).then(this.checkStatus).then(this.checkCode)
    }
    static put(url, data) {
        if (!url) return
        return axios({
            method: 'put',
            url,
            data: data,
            timeout: this.timeout
        }).then(this.checkStatus).then(this.checkCode)
    }
    static patch(url, data) {
        if (!url) return
        return axios({
            method: 'patch',
            url,
            data: data,
            timeout: this.timeout
        }).then(this.checkStatus).then(this.checkCode)
    }
    static delete(url, data) {
        if (!url) return
        return axios({
            method: 'delete',
            url,
            data: data,
            timeout: this.timeout
        }).then(this.checkStatus).then(this.checkCode)
    }
}