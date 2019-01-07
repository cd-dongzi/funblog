import Base from './base'
export default class MusicTab extends Base{
    // 获取音乐标签详情
    static getMusicTabInfo (id) {
        return this.get(`${this.baseUrl}/music/tabs/${id}`)
    }

    // 获取音乐标签列表
    static getMusicTabList (params) {
        return this.get(`${this.baseUrl}/music/tabs`, params)
    }

    // 更新音乐标签信息
    static updateMusicTab (_id, params) {
        return this.patch(`${this.baseUrl}/music/tabs/${_id}`, params)
    }

    // 新增音乐标签
    static addMusicTab (params) {
        return this.post(`${this.baseUrl}/music/tabs`, params)
    }

    // 删除音乐标签
    static delMusicTab (id) {
        return this.delete(`${this.baseUrl}/music/tabs/${id}`)
    }
}