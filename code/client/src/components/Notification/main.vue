<template>
    <transition name="notification">
        <!-- 通知框 -->
        <div id="notification" v-if="show" @click="close">
            <div class="title">
                <IconSvg name="weibiaoti1fuzhi"></IconSvg>
                <span>New Notification</span>
            </div>
            <div class="info">
                <div class="msg">{{msg}}</div>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        data () {
            return {
                show: false,
                msg: '',
                timer: null
            }
        },
        created () {
            this.timer = setTimeout(() => {
                this.close()
            }, 3000)
        },
        methods: {
            close () {
                clearTimeout(this.timer)
                this.show = false
            }
        }
    }
</script>
<style lang="less">
    /*====== [ 通知框 ] =======*/
    @l: 10px;
    #notification {
        position: fixed;
        bottom: @l;
        right: @l;
        overflow: hidden;
        width: 260px;
        color: #ddd;
        border-radius: 5px;
        background-color: rgba(35, 40, 45, 0.9);
        box-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
        @disY: 100% + @l;
        &.notification-enter, &.notification-leave-active {
            opacity: 0;
            transform: translateY(@disY)
        }
        &.notification-enter-active, &.notification-leave-active {
            transition: all .5s;
        }

        .title {
            text-align: center;
            padding: 10px;
            font-weight: 600;
            border-bottom: 1px solid #e22002;
        }
        .info {
            font-size: 13px;
            padding: 12px;
            word-break: break-all;
            .msg {
                line-height: 22px;
            }
        }
    }
</style>