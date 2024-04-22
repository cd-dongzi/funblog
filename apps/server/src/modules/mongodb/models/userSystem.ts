import db from 'mongoose';
import { UserSystem } from 'src/modules/mongodb/types/userSystem';

interface UserSystemDocument extends db.Document, UserSystem {
  _id: string;
}

const UserSystemModel = db.model<UserSystemDocument>(
  'user_system',
  new db.Schema({
    name: String,
    username: String,
    roles: [String],
    password: String,
    github: String,
    createTime: { type: Date, default: Date.now },
  }),
);

export { UserSystemModel, UserSystemDocument };
