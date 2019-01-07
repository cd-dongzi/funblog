<template>
    <PullLoad v-if="currentBlog.list && currentBlog.list.length > 0" :handleLoad="handleLoad" :handleRefresh="handleRefresh" :isWindow="true" :hasMore="currentBlog.hasMore">
        <Content id="blog-main" :blogs="currentBlog.list || []"></Content>
    </PullLoad>
    <NoneData v-else msg="暂未发表该类型博客" v-show="!isLoading"></NoneData>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import PullLoad from 'components/PullLoad'
    import Content from './content/index'
    export default {
        components: {
            Content,
            PullLoad
        },
        data() {
            return {
                pagesize: 5,
                isLoading: false
            }
        },
        computed: {
            ...mapState({
                blogs: state => state.blog.blogs
            }),
            currentBlog() {
                return this.blogs.find(item => item.name === this.classify) || this.blogs.find(item => item.name === 'all')
            },
            classify () {
                return this.$route.params.classify
            }
        },
        watch: {
            $route(to, from) {
                if (to.path.indexOf('blog') >= 0) {
                    this.getBlogs()
                }
            }
        },
        mounted() {
            this.getBlogs()
        },
        methods: {
            getBlogs() {
                this.isLoading = true
                this.$store.commit('SET_CURRENT_BLOG_CLASSIFY', {classify: this.classify})
                return new Promise(async (resolve, reject) => {
                    try {
                        const res = await this.$store.dispatch('getBlogs', {
                            classify: this.classify,
                            pageindex: this.currentBlog.pageindex || 1,
                            pagesize: this.pagesize,
                        })
                        this.isLoading = false
                        resolve()
                        this.setCurrentBlogs()
                        this.$bus.$emit('renderFooter')
                    } catch (err) {
                        reject()
                    }
                })
            },
            setCurrentBlogs () {
                const currentBlog = this.blogs.find(item => item.name === this.classify) || this.blogs.find(item => item.name === 'all')
                this.$store.commit('SET_CURRENT_BLOGS', currentBlog.list)
            },
            handleLoad() {
                this.$store.commit('SET_BLOG_PAGEINDEX', {
                    classify: this.classify,
                    type: 'add'
                })
                return this.getBlogs()
            },
            handleRefresh() {
                this.$store.commit('SET_BLOG_PAGEINDEX', {
                    classify: this.classify,
                    type: 'refresh'
                })
                return this.getBlogs()
            }
        }
    }
</script>