import { BlogTagModel } from '@server/models/blogTag'
import { Controller, Get } from '@server/decorators'

@Controller('/client')
export default class ClientBlogTagController {
  @Get('/blogTags')
  async getBlogTags() {
    return await BlogTagModel.find({
      isVisible: true
    }).sort({
      seq: -1
    })
  }
}
