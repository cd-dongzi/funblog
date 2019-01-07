import Mongodb from 'utils/mongodb'
import blogTabModel from 'models/blogTab'
import blogModel from 'models/blog'
import musicTabModel from 'models/musicTab'
import musicModel from 'models/music'

function updateTabCount(tabModel, targetModel) {
  return new Promise(async r => {
    const res = await Mongodb.find(tabModel)
    const getCounts = []
    res.forEach(async item => {
      const reg = new RegExp(item.name, 'i')
      getCounts.push({
        name: item.name,
        promise: Mongodb.getCount(targetModel, {
          $or: [{
            type: {
              $regex: reg
            }
          }]
        })
      })
    })
    const countPromises = getCounts.map(item => item.promise)
    const countNames = getCounts.map(item => item.name)
    const counts = await Promise.all(countPromises)

    const updatePromises = []
    countNames.forEach((name, index) => {
      updatePromises.push(Mongodb.update(tabModel, {
        name
      }, {
        total: counts[index]
      }))
    })

    await Promise.all(updatePromises)
    r()
  })
}

export default {
  async getBlogTabCount(ctx, next) {
    await updateTabCount(blogTabModel, blogModel)
    console.log('更新成功')
  },
  async getMusicTabCount(ctx, next) {
    await updateTabCount(musicTabModel, musicModel)
    console.log('更新成功')
  }
}