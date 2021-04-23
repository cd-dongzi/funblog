import { Context } from 'koa'
import { VisitorModel } from '@server/models/visitor'
import { getClientIp, getDataByUa, getLocationByIp } from '@server/utils/system'

// 记录游客
export const addVisitor = async (ctx: Context) => {
  const ip = getClientIp(ctx)
  const userAgent = ctx.request.headers['user-agent'] as string
  const system = getDataByUa(userAgent)
  const location = getLocationByIp(ip)
  const systemData: AnyObject = {
    userAgent,
    system,
    location
  }
  const findData = await VisitorModel.findOneAndUpdate(
    {
      ip
    },
    systemData
  )
  if (findData) {
    return
  }
  VisitorModel.create({
    ip,
    ...systemData
  })
}
