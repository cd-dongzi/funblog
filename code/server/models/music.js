import db from 'database/mongodb'
let Mixed = db.Schema.Types.Mixed
const Schema = db.Schema({
    type: Array,
    name: String,
    author: String,
    cover: String,
    ali_cover: String,
    url: String,
    ali_url: String,
    level: Number,
    album: String,
    desc: String,
    isVisible: Boolean,
    releaseTime: Mixed,
    updateTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now }
}, {
    versionKey: false
})
export default db.model('music', Schema)
