<template>
    <div class="message-list">
        <div class="message-title">给我留言（{{total}}）</div>
        <PullLoad v-if="list.length > 0" :handleLoad="handleLoad" :handleRefresh="handleRefresh" :isWindow="true" :hasMore="hasMore">
            <MessageItem v-for="(item, index) in list" :key="index" :item="item"></MessageItem>
        </PullLoad>
        <NoneData v-else msg="暂无留言信息"></NoneData>
    </div>
</template>
<script>
    import PullLoad from 'components/PullLoad'
    import MessageItem from './messageItem'
    import LeaveMessage from '@/api/leave_message'
    export default {
        components: {
            PullLoad,
            MessageItem
        },
        data () {
            return {
                list: [],
                total: 0,
                hasMore: true,
                pageindex: 1,
                pagesize: 10
            }
        },
        mounted () {
            this.getLeaveMessages()
            this.$bus.$on('addLeaveMessage', this.getLeaveMessages)
        },
        methods: {
            handleLoad () {
                this.pageindex ++
                return this.getLeaveMessages()
            },
            handleRefresh () {
                this.pageindex = 1
                return this.getLeaveMessages()
            },
            getLeaveMessages () {
                return new Promise(async resolve => {
                    const res = await LeaveMessage.getLeaveMessages({
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.total = res.data.total
                    let list = res.data.list.map(item => {
                        item.msg = this.formatMsg(item)
                        return item
                    })
                    if (list.length < this.pagesize) {
                        this.hasMore = false
                    }else{
                        this.hasMore = true
                    }
                    if (this.pageindex > 1) {
                        this.list = this.list.concat(list) 
                    }else{
                        this.list = list 
                    }
                    resolve()
                })
            },
            formatMsg (item) {
                return item.msg && item.msg.replace(/<a /gi, `<a target='_blank'`)
            }
        }
    }
</script>
<style lang="less">
    .message-list {
        margin-top: 20px;
        .message-title {
            color: @vice-color;
            line-height: 30px;
            border-bottom: 1px solid #ededed;
        }
        .m-li {
            padding: 15px 0 5px 0;
            border-top: 1px solid #ededed;
            &:first-child {
                border-top: none;
            }
        }
        .m-main {
            align-items: flex-start;
        }
        @w: 45px;
        @space: 20px;
        .m-avatar {
            width: @w;
            height: @w;
            border-radius: 4px;
        }
        .m-content {
            width: calc(~'100% - @{w} - @{space}');
        }
        .m-name {
            color: @vice-color;
            &:hover {
                text-decoration: underline;
                color: @theme-color;
            }
        }
        .m-floor {
            margin-left: 10px;
            font-size: 14px;
            color: #b5a8a8;
        }
        .m-comment {
            min-height: 70px;
            line-height: 20px;
            color: #6f6560;
            padding: 10px 0;
        }
        .m-foot {
            color: #b5a8a8;
            font-size: 14px;
            margin-bottom: 10px;
            .m-reply {
                color: @vice-color;
                margin-left: 8px;
                &:hover {
                    text-decoration: underline;
                    color: @theme-color;
                    cursor: pointer;
                }
            }
        }

        /* 评论 */
        .reply-box {
            width: calc(~'100% - @{w} - @{space}');
        }
    }
</style>