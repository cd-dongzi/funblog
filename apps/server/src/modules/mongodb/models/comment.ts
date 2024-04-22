import db from 'mongoose';
import { Comment } from 'src/modules/mongodb/types/comment';

interface CommentDocument extends db.Document, Comment {
  _id: string;
}

const CommentModel = db.model<CommentDocument>(
  'comment',
  new db.Schema({
    replyList: { type: Array, default: [] },
    userId: db.Schema.Types.ObjectId,
    name: String,
    url: String,
    avatar: String,
    content: String,
    floor: Number,
    role: [String],
    createTime: { type: Date, default: Date.now },
  }),
);

export { CommentModel, CommentDocument };
