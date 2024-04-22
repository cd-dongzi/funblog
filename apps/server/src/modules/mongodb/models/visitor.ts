import db from 'mongoose';
import { Visitor } from 'src/modules/mongodb/types/visitor';

interface VisitorDocument extends db.Document, Visitor {
  _id: string;
}

const VisitorModel = db.model<VisitorDocument>(
  'visitor',
  new db.Schema({
    ip: String,
    userAgent: String,
    system: Object,
    location: Object,
    createTime: { type: Date, default: Date.now },
  }),
);

export { VisitorModel, VisitorDocument };
