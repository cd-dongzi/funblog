import { Comment } from './comment'

export interface BlogComment extends Comment {
  articleId: string
}
