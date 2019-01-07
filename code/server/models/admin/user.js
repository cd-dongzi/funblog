import db from 'database/mongodb'
const userSchema = db.Schema({
    username: String,
    pwd: String,
    name: String,
    avatar: String,
    roles: Array,
    updateTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now }
}, {
    versionKey: false
})
export default db.model('user', userSchema)