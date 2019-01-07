import Base from './base'
export default class Music extends Base{
    // 获取音乐详情
    static getMusicInfo (id) {
        return this.get(`${this.baseUrl}/musics/${id}`)
    }

    // 获取音乐列表
    static getMusicList (params) {
        return this.get(`${this.baseUrl}/musics`, params)
    }

    // 更新音乐信息
    static updateMusic (_id, formData) {
        return this.patch(`${this.baseUrl}/musics/${_id}`, formData)
    }

    // 新增音乐
    static addMusic (formData) {
        return this.post(`${this.baseUrl}/musics`, formData, true)
    }

    // 删除音乐
    static delMusic (id) {
        return this.delete(`${this.baseUrl}/musics/${id}`)
    }
}