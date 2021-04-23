import db from '@server/database'
import { BlogTag } from '@root/src/models/blogTag'

interface BlogTagDocument extends db.Document, BlogTag {
  _id: string
}

const BlogTagModel = db.model<BlogTagDocument>(
  'blog_tag',
  new db.Schema({
    name: String,
    icon: String,
    color: String,
    seq: Number,
    isVisible: { type: Boolean, default: true },
    createTime: { type: Date, default: Date.now }
  })
)

export { BlogTagModel, BlogTagDocument }
