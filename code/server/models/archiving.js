import db from 'database/mongodb'
let archivingSchema = db.Schema({
    type: String,
    title: String,
    isVisible: Boolean,
    id: String,
    updateTime: { type: Date, default: Date.now },
    createTime: { type: Date, default: Date.now }
}, {
    versionKey: false
})
export default db.model('archiving', archivingSchema)