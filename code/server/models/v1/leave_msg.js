import db from 'database/mongodb'
let leavemagSchema = db.Schema({
    name: String,
    email: String,
    avatar: String,
    city: String,
    msg: String,
    url: String,
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
})
export default db.model('leave_mag', leavemagSchema);