import db from 'database/mongodb'
const ObjectId = db.Schema.ObjectId
let blogCommentSchema = db.Schema({
    articleid: ObjectId,
    isAuthor: {type: Boolean, default: false},
    sex: String,
    name: String,
    msg: String,
    email: String,
    qq: String,
    wechat: String,
    avatar: String,
    city: String,
    url: String,
    reply_list: Array,
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('blog_comment', blogCommentSchema)