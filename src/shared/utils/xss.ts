import { FilterXSS, getDefaultWhiteList, IWhiteList } from 'xss'

const whiteList = getDefaultWhiteList()
const keys = Object.keys(whiteList) as (keyof IWhiteList)[]
const obj: IWhiteList = {}
keys.forEach((key) => {
  const val = whiteList[key]
  val?.push('class', 'id')
  obj[key] = val
})
const xss = new FilterXSS({
  whiteList: obj
})
// xss过滤
export const filterXSS = (html: string) => {
  if (!html) return ''
  return xss.process(html)
}
