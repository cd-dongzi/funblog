import db from 'database/mongodb'
let visitorSchema = db.Schema({
    userAgent: String,
    ip: String,
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('visitor', visitorSchema)