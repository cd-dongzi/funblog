<template>
    <li class="r-li cf">
        <span class="reply-line"></span>
        <div class="r-main df-sb">
            <div class="r-avatar bg-cover" :style="{backgroundImage: `url(${require(`assets/images/avatar/${item.avatar}.jpg`)})`}"></div>
            <div class="r-content">
                <div class="r-meta align-c">
                    <Link class="r-name" :href="item.url">{{item.isAuthor ? '作者' : item.name}}</Link>
                    <span class="r-text">回复</span>
                    <Link class="r-questioner" :href="item.url">{{item.questioner.isAuthor ? '作者' : item.questioner.name}}</Link>
                </div>
                <div class="r-comment fmt" v-html="html"></div>
                <div class="r-foot align-c">
                    <time class="r-time">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</time>
                    <div class="r-reply" @click="isReply=true">回复</div>
                </div>
            </div>
        </div>
        <ReplyEditor class="fr" v-if="isReply" :info="item"></ReplyEditor>
    </li>
</template>
<script>
    import ReplyEditor from '../replyEditor'
    export default {
        props: {
            item: {
                type: Object
            }
        },
        components: {
            ReplyEditor
        },
        data() {
            return {
                isReply: false
            }
        },
        computed: {
            html() {
                return this.item.msg && this.item.msg.replace(/<a /gi, `<a target='_blank'`)
            }  
        }
    }
</script>
<style lang="less">
</style>