import db from 'database/mongodb'
let infoSchema = db.Schema({
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
})
export default db.model('info', infoSchema);