import { SET_BLOG_STATE, BlogState } from './type'
import { Blog } from '@root/src/models/blog'
import config from '@/config'
import { BlogAction } from './action'

const INIT_STATE: BlogState = {
  blogTag: config.blogMenuList[0].name,
  blogSubList: [],
  blogTags: [],
  blogTotal: 0,
  hotBlogSubList: [],
  latestBlogSubList: [],
  search: {
    list: [],
    total: 0
  },
  blogClassify: {
    list: [],
    total: 0
  },
  currentBlogInfo: {} as Blog,
  archive: {
    times: {},
    list: [],
    total: 0,
    year: 0,
    month: 0
  },
  blogComment: {
    list: [],
    total: 0
  }
}
const blog = (state = INIT_STATE, action: BlogAction): BlogState => {
  switch (action.type) {
    case SET_BLOG_STATE: {
      return {
        ...state,
        ...action.payload
      }
    }
    default:
      return state
  }
}

export default blog
