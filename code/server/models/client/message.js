import db from 'database/mongodb'
let messageSchema = db.Schema({
    name: String,
    msg: String,
    isAuthor: {type: Boolean, default: false},
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
export default db.model('message', messageSchema)