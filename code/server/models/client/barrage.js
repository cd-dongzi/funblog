import db from 'database/mongodb'
let barrageSchema = db.Schema({
    name: String,
    msg: String,
    email: String,
    qq: String,
    wechat: String,
    avatar: String,
    city: String,
    url: String,
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('barrage', barrageSchema)