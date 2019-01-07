import db from 'database/mongodb'
const exampleSchema = db.Schema({
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
    updateTime: { type: Date, default: Date.now},
    createTime: { type: Date, default: Date.now}
}, {
    versionKey: false
})
export default db.model('example', exampleSchema)