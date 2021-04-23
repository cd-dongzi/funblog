import { Context, Next } from 'koa'
import etag from 'etag'
import Stream from 'stream'
import util from 'util'
import fs from 'fs'

const stat = util.promisify(fs.stat)

const getResponseEntity = async (ctx: Context) => {
  // no body
  const body = ctx.body
  if (!body || ctx.response.get('etag')) return

  // type
  const status = (ctx.status / 100) | 0

  // 2xx
  if (status !== 2) return
  if (body instanceof Stream) {
    if (!(body as any).path) return
    return await stat((body as any).path)
  } else if (typeof body === 'string' || Buffer.isBuffer(body)) {
    return body
  } else {
    return JSON.stringify(body)
  }
}
const etagMiddleeware = (options?: etag.Options) => {
  return async (ctx: Context, next: Next) => {
    if (ctx.path.startsWith('/api/')) {
      return await next()
    }
    await next()
    const entity = await getResponseEntity(ctx)
    if (!entity) return
    ctx.response.etag = etag(entity, options)
  }
}

export default etagMiddleeware
