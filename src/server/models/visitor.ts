import db from '@server/database'
import { Visitor } from '@root/src/models/visitor'

interface VisitorDocument extends db.Document, Visitor {
  _id: string
}

const VisitorModel = db.model<VisitorDocument>(
  'visitor',
  new db.Schema({
    ip: String,
    userAgent: String,
    system: Object,
    location: Object,
    createTime: { type: Date, default: Date.now }
  })
)

export { VisitorModel, VisitorDocument }
