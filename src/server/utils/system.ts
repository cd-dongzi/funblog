import Parser from 'ua-parser-js'
import ip2region from 'node-ip2region'
const searcher = ip2region.create()

// 获取客户端ip
export const getClientIp = (ctx: any) => {
  return (
    ctx.request.headers['x-forwarded-for'] ||
    (ctx.request.connection && ctx.request.connection.remoteAddress) ||
    (ctx.request.socket && ctx.request.socket.remoteAddress) ||
    (ctx.request.connection.socket && ctx.request.connection.socket.remoteAddress) ||
    null
  )
}
// 解析ua数据
export const getDataByUa = (ua: string) => {
  const vm = new Parser(ua)
  return vm.getResult()
}

export const getLocationByIp = (clientIp: string) => {
  try {
    if (clientIp.split(',').length > 1) {
      clientIp = clientIp.split(',')[0]
    }
    const data = searcher.btreeSearchSync(clientIp)
    const region = data?.region
    let obj: any = {}
    if (region) {
      const arr = region.split('|')
      obj = {
        country: arr[0],
        area: arr[1],
        province: arr[2],
        city: arr[3],
        ISP: arr[4]
      }
    }
    if (!obj.country || obj.country === '0') {
      return null
    }
    return obj
  } catch (e) {
    return null
  }
}
