<template>
    <article class="blog-comment">
        <div class="total">
            <span>留言总数：</span>
            <span class="num">{{total}}</span>
        </div>
        <ul class="comment-box">
            <li class="comment cf" v-for="(item, index) in list" :key="index">
                <div class="c-main cf">
                    <div class="bg-cover fl c-avatar" :style="{backgroundImage: `url(${require(`assets/images/avatar/${item.avatar}.jpg`)})`}"></div>
                    <div class="fr c-content">
                        <div class="c-meta align-c">
                            <Link :href="item.url" class="c-name">{{item.isAuthor ? '作者' : item.name}}</Link>
                            <span class="c-time">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                            <span class="c-reply" @click="reply({index, item})">回复</span>
                        </div>
                        <p>{{item.msg}}</p>
                    </div>
                </div>
                <ReplyList v-if="item.reply_list.length > 0" :list="item.reply_list" @reply="reply" :index="index" :info="item"></ReplyList>
                <ReplyBox v-if="currentReplyObj && currentIndex===index" @add="addBlogComment" :currentReplyObj="currentReplyObj"
                    @close="close"></ReplyBox>
            </li>
        </ul>
        <button class="btn-clear btn-load df-c" :class="{none: !hasMore, loading: isLoading}" @click="handleLoad">
            <IconSvg name="loading" class="btn-loading"></IconSvg>
            <span></span>
        </button>
        <ReplyBox v-if="!currentReplyObj" @add="addBlogComment" :currentReplyObj="currentReplyObj" :blogInfo="blogInfo" class="replay-box-b"></ReplyBox>
    </article>
</template>

<script>
    import ReplyBox from './replyBox'
    import ReplyList from './replyList'
    import PullLoad from 'components/PullLoad'
    import BlogComment from '@/api/blog_comment'
    import FontLoading from 'components/Loading/FontAnimate'
    export default {
        props: {
          blogInfo: Object
        },
        components: {
            ReplyList,
            ReplyBox,
            PullLoad,
            FontLoading
        },
        data() {
            return {
                list: [],
                total: 0,
                currentReplyObj: null,
                currentIndex: -1,
                hasMore: true,
                pageindex: 1,
                pagesize: 10,
                isLoading: false
            }
        },
        async mounted() {
            await this.getBlogComments()
        },
        methods: {
            close() {
                this.currentReplyObj = null
            },
            reply({index, item}) {
                this.currentReplyObj = item
                this.currentIndex = index
            },
            handleLoad () {
                this.pageindex ++
                return this.getBlogComments()
            },
            addBlogComment() {
                this.currentReplyObj = null
                this.currentIndex = -1
                this.getBlogComments()
            },
            async getBlogComments() {
                this.isLoading = true
                return new Promise(async resolve => {
                    const res = await BlogComment.getBlogComments({
                        articleid: this.$route.params.id,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    let list = res.data.list
                    if (list.length < 10) {
                        this.hasMore = false
                    }else{
                        this.hasMore = true
                    }
                    if (this.pageindex > 1) {
                        this.list = this.list.concat(list) 
                    }else{
                        this.list = list 
                    }
                    this.total = res.data.total
                    this.isLoading = false
                    resolve()
                })
            }
        }
    }
</script>

<style lang="less">
@import './style.less';
</style>