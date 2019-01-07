import Mongodb from 'utils/mongodb'
import blogModel from 'models/blog'
import blogTabModel from 'models/blogTab'

export default {
  async updateBlogTabOrAddBlogTab() {
    log.adminTitle('开始更新 blog tabs')
    const blogs = await blogModel.find(blogModel)
    const blogTabs = []
    blogs.forEach(item => {
      const tabs = item.type
      tabs.forEach(tab => {
        const obj = blogTabs.find(blogTab => blogTab && blogTab.name === tab)
        if (obj) {
          obj.total++
        } else {
          blogTabs.push({
            name: tab,
            desc: tab,
            total: 1
          })
        }
      })
    })

    for (let i = 0, len = blogTabs.length; i < len; i++) {
      const item = blogTabs[i]
      try {
        await Mongodb.update(blogTabModel, {
          name: item.name
        }, item, {
          upsert: true // 没有值便插入新值
        })
      } catch (err) {
        console.log(err)
      }
    }
    log.adminTitle('结束更新 blog tabs')
  }
}