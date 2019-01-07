import db from 'database/mongodb'
let leaveMessageSchema = db.Schema({
    isAuthor: {type: Boolean, default: false},
    sex: String,
    name: String,
    msg: String,
    old_msg: String,
    email: String,
    qq: String,
    wechat: String,
    avatar: String,
    city: String,
    url: String,
    floor: Number,
    reply_list: Array,
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('leave_message', leaveMessageSchema)