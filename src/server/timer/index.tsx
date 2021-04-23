import schedule from 'node-schedule'
import ClientGithubController from '@server/controllers/api/client/github'

// 同步github信息
export const syncGithub = async () => {
  const o = new ClientGithubController()
  await o.syncGithubRepos()
}
export default () => {
  // 每个小时第30分钟0秒的执行一次
  schedule.scheduleJob('0 30 * * * *', () => {
    syncGithub()
  })
}
