import db from 'database/mongodb'
const musicTabSchema = db.Schema({
    name: String,
    desc: String,
    total: Number,
    color: String,
    icon: String,
    updateTime: { type: Date, default: Date.now},
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('musicTab', musicTabSchema)