import db from 'mongoose';
import { Link, LinkStatus } from 'src/modules/mongodb/types/link';

interface LinkDocument extends db.Document, Link {
  _id: string;
}

const LinkModel = db.model<LinkDocument>(
  'link',
  new db.Schema({
    title: String,
    url: String,
    desc: String,
    type: String,
    logo: String,
    userId: db.Types.ObjectId,
    isVisible: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: LinkStatus.REVIEW,
      enum: Object.values(LinkStatus),
    },
    refuseReason: String,
    createTime: { type: Date, default: Date.now },
  }),
);

export { LinkModel, LinkDocument, LinkStatus };
