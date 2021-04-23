import { Model, Document } from 'mongoose'
import axios from 'axios'
import rootConfig from '@root/src/shared/config'

/**
 * 格式化查询参数
 *
    EQ 等于
    LK 模糊

    LT  小于
    LTE 小于等于
    GT  大于
    GTE 大于等于

    GTE  -  LT     GTE <= n < LT
    GTE  -  LTE     GTE <= n <= LTE
    GT  -  LT     GT < n < LT
    GT  -  LTE     GT < n <= LTE
 * @export
 * @param {AnyObject} query
 * @returns
 */
export type FormatQueryByListReturnType = {
  filter: any
  projection: any
  options: any
  params: {
    page: any
    size: any
  }
}

export function formatQueryByList(query: AnyObject, opts: AnyObject = {}): FormatQueryByListReturnType {
  const { projection = {}, options } = opts
  const { page = 1, size = 10 } = query
  const keys = Object.keys(query).reduce(
    (arr, key) => {
      const typeStr = key.slice(key.length - 2)
      if (typeStr === 'EQ') {
        arr.push({
          type: 'EQ',
          key: key.slice(0, key.length - 2),
          oldKey: key
        })
      }
      if (typeStr === 'LK') {
        arr.push({
          type: 'LK',
          key: key.slice(0, key.length - 2),
          oldKey: key
        })
      }
      return arr
    },
    [] as {
      type: 'EQ' | 'LK'
      key: string
      oldKey: string
    }[]
  )
  const $or = keys
    .filter((item) => item.type === 'LK')
    .map((item) => {
      return {
        [item.key]: { $regex: query[item.oldKey] }
      }
    })
  const eqKeys = keys.filter((item) => item.type === 'EQ')
  const filter: AnyObject = {}
  if ($or.length > 0) {
    filter.$or = $or
  }
  if (eqKeys.length > 0) {
    eqKeys.forEach((item) => {
      filter[item.key] = query[item.oldKey]
    })
  }
  return {
    filter: {
      ...filter,
      ...(opts.filter || {})
    },
    projection: {
      __v: 0,
      ...projection
    },
    options: {
      limit: size,
      skip: (page - 1) * size,
      sort: { createTime: -1 },
      ...options
    },
    params: {
      page,
      size,
      ...query
    }
  }
}

// 获取分页数据
export const getDataByPage = async <T extends Document>(query: FormatQueryByListReturnType, model: Model<T>) => {
  const [list, total] = await Promise.all([
    model.find(query.filter, query.projection, query.options),
    model.find(query.filter).countDocuments()
  ])
  return {
    list,
    total,
    totalPages: Math.ceil(total / query.params.size)
  }
}

// 获取github repo信息
const baseUrl = 'https://api.github.com'
export const getRepoInfo = (name: string) => {
  return new Promise<AnyObject>(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`${baseUrl}/repos/${rootConfig.github.username}/${name}`, {
        headers: {
          Authorization: `token ${rootConfig.github.token}`
        }
      })
      resolve({
        name: data.name,
        stargazers_count: data.stargazers_count,
        forks_count: data.forks_count,
        subscribers_count: data.subscribers_count,
        description: data.description,
        html_url: data.html_url,
        created_at: data.created_at,
        updated_at: data.updated_at
      })
    } catch (e) {
      reject(e)
    }
  })
}

export const sleep = (time = 2000) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
