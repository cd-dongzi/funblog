import { Controller, Get } from '@server/decorators'
import { VisitorModel } from '@server/models/visitor'

@Controller('/client')
export default class ClientCommonController {
  // 获取游客人数
  @Get('/common/visitors/count')
  async getVisitorsCount() {
    return await VisitorModel.find().countDocuments()
  }
  @Get('/common/test')
  async getTest() {
    return 'test'
  }
}
