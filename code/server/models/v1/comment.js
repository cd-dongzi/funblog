import db from 'database/mongodb'
let ObjectId = db.Schema.ObjectId;
let commentSchema = db.Schema({
    articleid: ObjectId,
    name: String,
    email: String,
    avatar: String,
    intro: String,
    url: String,
    reply_list: Array,
    createTime: { type: Date, default: Date.now}
})
export default db.model('comment', commentSchema);