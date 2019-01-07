import db from 'database/mongodb'
let caseSchema = db.Schema({
    title: String,
    name: String,
    type: Array,
    filetype: String,
    desc: String,
    level: Number,
    url: String,
    source: Number,
    github: String,
    download_num: { type: Number, default: 0},
    isVisible: Boolean,
    createTime: { type: Date, default: Date.now}
})
export default db.model('case', caseSchema);