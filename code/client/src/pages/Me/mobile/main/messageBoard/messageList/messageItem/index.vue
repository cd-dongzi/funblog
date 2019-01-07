<template>
    <section class="m-li cf">
        <div class="m-main df-sb">
            <div class="m-avatar bg-cover" :style="{backgroundImage: `url(${require(`assets/images/avatar/${item.avatar}.jpg`)})`}"></div>
            <div class="m-content">
                <div class="m-meta align-c">
                    <Link class="m-name" :href="item.url">{{item.isAuthor ? '作者' : item.name}}</Link>
                    <div class="m-floor">第{{item.floor}}楼</div>
                </div>
                <div class="m-comment fmt" v-html="item.msg"></div>
                <div class="m-foot align-c">
                    <time class="m-time">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</time>
                    <div class="m-reply" @click="isReply=true">回复</div>
                </div>
                <ReplyEditor v-if="isReply" :info="item"></ReplyEditor>
            </div>
        </div>
        <replyBox v-if="item.reply_list.length > 0" class="reply-box fr" :list="item.reply_list"></replyBox>
    </section>
</template>
<script>
    import replyBox from './replyBox'
    import ReplyEditor from './replyEditor'
    export default {
        props: {
            item: {
                type: Object
            }
        },
        components: {
            ReplyEditor,
            replyBox
        },
        data () {
            return {
                isReply: false
            }
        }
    }
</script>