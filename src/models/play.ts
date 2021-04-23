import { BlogTag } from './blogTag'

export interface Play {
  _id: string
  title: string
  desc: string
  tags: BlogTag[]
  github: string
  url: string
  file: string
  folder: string[]
  fileType: 'file' | 'folder'
  cover: string
  source: string
  download_nums: number
  isVisible: boolean
  createTime: string
}
