import db from 'database/mongodb'
let friendSchema = db.Schema({
    name: String,
    avatar: String,
    email: String,
    link: String,
    desc: String,
    isVisible: Boolean,
    createTime: { type: Date, default: Date.now}
})
export default db.model('friend', friendSchema);
