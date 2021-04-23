import db from '@server/database'

interface CounterDocument extends db.Document {
  _id: string
  name: string
  count: number
}

const CounterModel = db.model<CounterDocument>(
  'counter',
  new db.Schema({
    name: String,
    count: Number,
    createTime: { type: Date, default: Date.now }
  })
)

export { CounterModel, CounterDocument }
