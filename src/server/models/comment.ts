import db from '@server/database'
import { Comment } from '@root/src/models/comment'

interface CommentDocument extends db.Document, Comment {
  _id: string
}

const CommentModel = db.model<CommentDocument>(
  'comment',
  new db.Schema({
    replyList: { type: Array, default: [] },
    userId: String,
    name: String,
    url: String,
    avatar: String,
    content: String,
    floor: Number,
    role: [String],
    createTime: { type: Date, default: Date.now }
  })
)

export { CommentModel, CommentDocument }
