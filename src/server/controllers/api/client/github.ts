import { Controller, Get } from '@server/decorators'
import { GithubModel } from '@server/models/github'
import { getRepoInfo } from '../utils'

@Controller('/client')
export default class ClientGithubController {
  @Get('/github/repos/sync')
  async syncGithubRepos() {
    const names = (await GithubModel.find()).map((item) => item.name)
    if (names) {
      const promises: Promise<any>[] = []
      names.forEach((name) => {
        promises.push(getRepoInfo(name))
      })
      const promisesData = (await (await Promise.all(promises.map((p) => p.catch((e) => null))))
        .map((data) => {
          if (data) {
            return data
          }
          return null
        })
        .filter((item) => !!item)) as AnyObject[]
      const opts = promisesData.map((item) => {
        const { name, ...data } = item
        return {
          updateOne: {
            filter: {
              name
            },
            update: data
          }
        }
      })
      await GithubModel.bulkWrite(opts)
    }
  }
  @Get('/github/repos')
  async getRepos() {
    return await GithubModel.find(
      {},
      { createTime: 0, __v: 0, seq: 0, isVisible: 0 },
      {
        sort: {
          seq: -1
        }
      }
    )
  }
}
