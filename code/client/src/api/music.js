import Base from './base'
export default class Music extends Base{
    // 获取音乐详情
    static getMusicInfo (id) {
        return this.get(`${this.baseUrl}/musics/${id}`)
    }

    // 获取音乐列表
    static getMusics (params) {
        return this.get(`${this.baseUrl}/musics`, params)
    }

    // 获取音乐随机列表
    static getRandomMusics (params) {
        return this.get(`${this.baseUrl}/musics/random`, params)
    }

    // 随机获取一首音乐
    static getRandomMusicInfo (params) {
        return this.get(`${this.baseUrl}/musics/random_info`, params)
    }
}