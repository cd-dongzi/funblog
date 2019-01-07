import Base from './base'
export default class MusicTab extends Base{
    // 获取博客标签列表
    static getMusicTabs (params) {
        return this.get(`${this.baseUrl}/music/tabs`)
    }
}