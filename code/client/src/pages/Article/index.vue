<template>
    <main class="article-container">
        <Back class="article-back" :path="backPath"></Back>
        <div id="article" v-if="info.title">
            <div class="article-nums">
                <span>文章阅读量:</span>
                <span>{{info.total_nums}}</span>
            </div>
            <article class="article-content cf">
                <Github class="github" v-if="info.github" :path="info.github"></Github>
                <h1>{{info.title}}</h1>
                <div class="article-intro fmt" v-html="html" @click="onClick"></div>
            </article>
        </div>
        <Comment v-if="info.title" id="blog-comment" :blogInfo="info"></Comment>
    </main>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import Github from 'components/Github'
    import Comment from './comment'
    import Blog from '@/api/blog'
    import config from '@/config'
    export default {
        components: {
            Github,
            Comment
        },
        computed: {
            ...mapState({
                info: state => {
                    return state.blog ? state.blog.currentArticle : {}
                },
                currentClassify: state => state.blog.currentClassify
            }),
            html() {
                return this.info.html && this.info.html.replace(/<a /gi, `<a target='_blank'`)
            },
            backPath () {
                return this.currentClassify ? `/blog/${this.currentClassify}` : '/blog'
            }
        },
        asyncData({ store, route }) {
            console.log('----asyncData---------')
            return store.dispatch('getBlogInfo', route.params.id)
        },
        watch: {
            info: {
                immediate: true,
                handler () {
                    this.$nextTick(() => {
                        if (typeof window !== "undefined") {
                            document.title = this.info.title || '没找到博客呢！'
                        }
                    })
                }
            }
        },
        mounted () {
            this.$bus.$emit('onShowMsg', `您正在阅读<a href="${this.info.github||'javascript:;'}" target="_blank">${this.info.title}</a>这篇文章哦~~`)
            this.addBlogReadingNum()
        },
        methods: {
            onClick (e) {
                let target = e.target
                if (target.tagName === 'IMG') {
                    this.$imgShow({
                        url: target.src,
                        alt: target.alt
                    })
                }
            },
            addBlogReadingNum () {
                import('@/utils/storage').then(async ({Session}) => {
                    let ids = Session.get(config.keys.articleReadingKey) || '',
                        _id = this.$route.params.id
                    ids = ids.split(',').filter(id => id)
                    if (ids.some(id => id === _id)) return
                    ids.push(_id)
                    await Blog.addBlogReadingNum(_id)
                    Session.set(config.keys.articleReadingKey, ids.join(','))
                })
            }
        }
    }
</script>

<style lang="less">
    @import './style.less';
</style>