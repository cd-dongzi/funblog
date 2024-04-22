import db from 'mongoose';
import { User } from 'src/modules/mongodb/types/user';

interface UserDocument extends db.Document, User {
  _id: string;
}

const UserModel = db.model<UserDocument>(
  'user',
  new db.Schema({
    name: String,
    email: String,
    refId: String,
    avatar: String,
    url: String,
    role: { type: [String], default: [] },
    ip: String,
    system: Object,
    location: Object,
    userAgent: String,
    createTime: { type: Date, default: Date.now },
  }),
);

export { UserModel, UserDocument };
