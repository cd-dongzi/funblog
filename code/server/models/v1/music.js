import db from 'database/mongodb'
let Mixed = db.Schema.Types.Mixed;
let musicSchema = db.Schema({
    type: Array,
    name: String,
    author: String,
    cover: String,
    tx_cover: String,
    url: String,
    tx_url: String,
    level: Number,
    releaseTime: Mixed,
    album: String,
    desc: String,
    isVisible: Boolean,
    createTime: { type: Date, default: Date.now}
})
export default db.model('music', musicSchema);