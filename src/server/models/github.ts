import db from '@server/database'
import { Github } from '@root/src/models/github'

interface GithubDocument extends db.Document, Github {
  _id: string
}

const GithubModel = db.model<GithubDocument>(
  'github',
  new db.Schema({
    name: String,
    isVisible: Boolean,
    stargazers_count: Number,
    forks_count: Number,
    subscribers_count: Number,
    description: String,
    html_url: String,
    created_at: String,
    updated_at: String,
    seq: Number,
    createTime: { type: Date, default: Date.now }
  })
)

export { GithubModel, GithubDocument }
