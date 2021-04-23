import mongoose from 'mongoose'
import config from '@server/config'

export const start = () => {
  return new Promise((resolve, reject) => {
    let mongoOptions: mongoose.ConnectOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
    if (config.mongodb.auth) {
      mongoOptions = {
        ...mongoOptions,
        auth: {
          user: config.mongodb.username,
          password: config.mongodb.password
        },
        authSource: config.mongodb.authSource
      }
    }
    mongoose.connect(`mongodb://${config.mongodb.address}/${config.mongodb.db}`, mongoOptions, (err) => {
      if (err) {
        console.log('数据库连接失败！')
        reject(err)
      } else {
        console.log('数据库连接成功！')
        resolve(null)
      }
    })
  })
}
export default mongoose
