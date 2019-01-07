<template>
    <div class="wall-layout" :style="{height: `${screen.height}px`}">
        <div class="wall-bg">
            <Issue @open="open" ref="issue"></Issue>
            <IconSvg name="refresh1" class="refresh hover" :class="{active: refreshLoading}" @click.native="refresh"></IconSvg>
            <Note v-for="(item, index) in messages" :key="index" :item="item" 
                :noteIndex.sync="noteIndex" 
                :issueObj="issueObj"
                @crash="showRaindropCanvas=true"></Note>
        </div>
        <LeaveMessage :show.sync="showLeaveMessage" @addMessage="addMessage"></LeaveMessage>
        <RaindropCanvas v-if="showRaindropCanvas" @close="showRaindropCanvas=false"></RaindropCanvas>
    </div>
</template>
<script>
    import Note from './note'
    import Issue from './issue'
    import LeaveMessage from './leaveMessage'
    import Message from '@/api/message'
    import {
        randNumber
    } from '@/utils/number'
    export default {
        components: {
            Note,
            Issue,
            LeaveMessage,
            RaindropCanvas: resolve => require(['components/RaindropCanvas/index'], resolve)
        },
        data() {
            return {
                // 刷新
                refreshLoading: false,
                // canvas
                showRaindropCanvas: false,
                // issueDOm
                issueObj: null,
                // 留言
                showLeaveMessage: false,
                // 留言列表
                messages: [],
                // 拖拽元素层级
                noteIndex: 1,
                // 最大拖拽距离
                crashOffset: {
                    w: 0,
                    h: 0
                }
            }
        },
        computed: {
            screen() {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.screen
                }
                return {}
            }
        },
        mounted() {
            this.$bus.$emit('onShowMsg', `您想给我留言吗?`)
            this.crashOffset = {
                x: this.screen.width - 235,
                y: this.screen.height - 235,
            }
            this.getMessages()
            this.issueObj = this.$refs.issue.$el
        },
        methods: {
            // 刷新
            async refresh() {
                if (this.refreshLoading) {
                    return
                }
                this.refreshLoading = true
                await this.getMessages()
                this.refreshLoading = false
            },
            // 留言
            open() {
                this.showLeaveMessage = true
            },
            // 新增留言
            addMessage (info) {
                this.messages.push(this.formatStyleByMessage(info))
            },
            // 获取留言信息
            getMessages() {
                return new Promise(async (resolve, reject) => {
                    const res = await Message.getMessages()
                    this.messages = res.data.map(item => this.formatStyleByMessage(item))
                    this.$nextTick(() => {

                    })
                    resolve()
                })
            },
            formatStyleByMessage(item) {
                item.style = {
                    left: `${randNumber(0, this.crashOffset.x)}px`,
                    top: `${randNumber(0, this.crashOffset.y)}px`
                }
                item.bg = randNumber(1, 6)
                return item
            }
        }
    }
</script>
<style lang="less">
    .wall-bg {
        width: 100%;
        height: 100%;
        background-image: url('../../../assets/images/wall/wall.png');
        .refresh {
            position: absolute;
            color: @theme-color;
            right: 40px;
            top: 20px;
            font-size: 50px;
            z-index: 98;
            padding: 10px;
            &.active {
                animation: rotate360 1s linear infinite;
            }
        }
    }
</style>