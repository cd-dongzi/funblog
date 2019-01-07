import Vue from 'vue'
import Blog from '@/api/blog'
import BlogTab from '@/api/blogTab'
const blog = {
    state: {
        currentArticle: {},
        blogs: [],
        currentBlogs: [],
        currentClassify: ''
    },
    actions: {
        // 获取博客详情
        getBlogInfo ({commit}, id) {
            return new Promise(async (resolve, reject) => {
                const res = await Blog.getBlogInfo(id)
                commit('SET_BLOG_INFO', res.data)
                resolve(res.data)
            })
        },
        // 获取标签
        getBlogTabs ({commit}) {
            return new Promise(async (resolve, reject) => {
                const res = await BlogTab.getBlogTabs()
                commit('SET_BLOGS', {
                    type: 'tab',
                    data: res.data
                })
                resolve(res)
            })
        },
        // 获取对应博客
        getBlogs ({commit, state}, params) {
            let {classify='all', pageindex, pagesize} = params
            if (!state.blogs.find(item => item.name === classify)) {
                classify = 'all'
            }
            const obj = state.blogs.find(item => item.name === classify)
            // 没有更多
            if (obj.hasMore === false) {
                return
            }
            // 没有加载
            if (obj.pageindex && obj.prev_pageindex === obj.pageindex) {
                return
            }
            return new Promise(async (resolve, reject) => {
                const res = await Blog.getBlogs({
                    type: classify === 'all' ? '':classify,
                    pageindex, pagesize
                })
                const list = res.data

                // 是否还能加载更多
                if (list.length < pagesize) {
                    obj.hasMore = false
                }else{
                    obj.hasMore = true
                }
                
                obj.prev_pageindex = pageindex
                // 是否还能加载更多
                if (pageindex === 1) {
                    commit('SET_BLOGS', {
                        type: 'blog',
                        data: list,
                        classify
                    })
                }else{
                    commit('SET_BLOGS', {
                        type: 'blog',
                        data: (obj.list || []).concat(list),
                        classify
                    })
                }
                resolve(res)
            })
        }
    },
    mutations: {
        SET_BLOG_INFO (state, payload) {
            state.currentArticle = payload
        },
        SET_BLOGS (state, payload) {
            const {type, data, classify} = payload
            if (type === 'tab') {
                state.blogs = [{
                    name: 'all'
                }, ...data].map(item => {
                    item.path = `/blog/${item.name}`
                    return item
                })
            }else {
                let obj = state.blogs.find(item => item.name === classify),
                    index = state.blogs.findIndex(item => item.name === classify)
                obj = Object.assign({}, obj, {
                    list: data
                })
                Vue.prototype.$set(state.blogs, index, obj)
            }
        },
        SET_CURRENT_BLOGS (state, payload) {
            state.currentBlogs = payload
        },
        SET_CURRENT_BLOG_CLASSIFY (state, payload) {
            state.currentClassify = payload.classify
        },
        SET_BLOG_PAGEINDEX (state, payload) {
            if (state.blogs.every(item => item.name !== payload.classify)) {
                payload.classify = 'all'
            }
            if (payload.type === 'refresh') {
                const currentBlog = state.blogs.find(item => item.name === payload.classify)
                currentBlog.pageindex = 1
            }else{
                const currentBlog = state.blogs.find(item => item.name === payload.classify)
                currentBlog.pageindex || (currentBlog.pageindex = 1)
                currentBlog.pageindex ++  
            }
        }
    }
}

export default blog