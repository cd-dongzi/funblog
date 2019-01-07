import path from 'path'
export default (app) => {
  global.$app = app
  global.$publicPath = path.resolve(__dirname, '../../../public').split(path.sep).join('/')
  global.$serverPath = path.resolve(__dirname, '../').split(path.sep).join('/')
  global.log = {
    adminTitle: msg => {
      const str = 'admin'
      console.log(`-----------${str}=>${msg}-----------`)
    },
    clientTitle: msg => {
      const str = 'client'
      console.log(`-----------${str}=>${msg}-----------`)
    }
  }
}