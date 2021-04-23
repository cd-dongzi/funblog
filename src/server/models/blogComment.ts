import db from '@server/database'
import { Comment } from '@root/src/models/comment'

interface BlogCommentDocument extends db.Document, Comment {
  _id: string
  articleId: string
}

const BlogCommentModel = db.model<BlogCommentDocument>(
  'blog_comment',
  new db.Schema({
    replyList: { type: Array, default: [] },
    articleId: db.Schema.Types.ObjectId,
    userId: db.Schema.Types.ObjectId,
    name: String,
    url: String,
    avatar: String,
    content: String,
    floor: Number,
    role: [String],
    createTime: { type: Date, default: Date.now }
  })
)

export { BlogCommentModel, BlogCommentDocument }
