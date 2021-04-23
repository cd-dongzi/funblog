import db from '@server/database'
import { Play } from '@root/src/models/play'

interface PlayDocument extends db.Document, Play {
  _id: string
}

const PlayModel = db.model<PlayDocument>(
  'play',
  new db.Schema({
    title: String,
    tags: Array,
    desc: String,
    github: String,
    cover: String,
    fileType: String,
    file: String,
    folder: [String],
    url: String,
    source: String,
    download_nums: { type: Number, default: 0 },
    isVisible: Boolean,
    createTime: { type: Date, default: Date.now }
  })
)

export { PlayModel, PlayDocument }
