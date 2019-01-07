import Mongodb from 'utils/mongodb'
import musicModel from 'models/music'
import musicTabModel from 'models/musicTab'

export default {
  async updateMusicTabOrAddMusicTab() {
    log.adminTitle('开始更新 music tabs')
    const musics = await musicModel.find(musicModel)
    const musicTabs = []
    musics.forEach(item => {
      const tabs = item.type
      tabs.forEach(tab => {
        const obj = musicTabs.find(musicTab => musicTab && musicTab.name === tab)
        if (obj) {
          obj.total++
        } else {
          musicTabs.push({
            name: tab,
            desc: tab,
            total: 1
          })
        }
      })
    })

    for (let i = 0, len = musicTabs.length; i < len; i++) {
      const item = musicTabs[i]
      try {
        await Mongodb.update(musicTabModel, {
          name: item.name
        }, item, {
          upsert: true // 没有值便插入新值
        })
      } catch (err) {
        console.log(err)
      }
    }
    log.adminTitle('结束更新 music tabs')
  }
}