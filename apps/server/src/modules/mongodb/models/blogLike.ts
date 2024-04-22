import db from 'mongoose';
import { BlogLike } from 'src/modules/mongodb/types/blogLike';

interface BlogLikeDocument extends db.Document, BlogLike {
  _id: string;
}

const BlogLikeModel = db.model<BlogLikeDocument>(
  'blog_like',
  new db.Schema({
    articleId: db.Schema.Types.ObjectId,
    userId: db.Schema.Types.ObjectId,
    ip: String,
    createTime: { type: Date, default: Date.now },
  }),
);

export { BlogLikeModel, BlogLikeDocument };
