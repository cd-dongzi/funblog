import db from '@server/database'
import { Blog } from '@root/src/models/blog'

interface BlogDocument extends db.Document, Blog {
  _id: string
}

const BlogModel = db.model<BlogDocument>(
  'blog',
  new db.Schema({
    title: String,
    tags: Array,
    desc: String,
    github: String,
    cover: String,
    source: String,
    md: String,
    isVisible: Boolean,
    read_nums: { type: Number, default: 0 },
    like_nums: { type: Number, default: 0 },
    comment_nums: { type: Number, default: 0 },
    updateTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now }
  })
)

export { BlogModel, BlogDocument }
