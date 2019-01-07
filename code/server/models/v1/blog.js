import db from 'database/mongodb'
let blogSchema = db.Schema({
    type: Array,
    title: String,
    desc: String,
    html: String,
    markdown: String,
    level: Number,
    total_nums: { type: Number, default: 0},
    github: String,
    source: Number,
    isVisible: Boolean,
    releaseTime: Date,
    createTime: { type: Date, default: Date.now}
})
export default db.model('blog', blogSchema);