import glob from 'glob'
import Utils from '@root/build/utils'
import Paths from '@root/build/paths'
export default (router: any) => {
  router.get('/demo/logs', async (ctx: any, next: any) => {
    // const files = glob.sync(Utils.resolve('logs'))
    // console.log(files)
    // console.log(require('./2021-04-23.log'))
    ctx.send('ok')
  })
}
