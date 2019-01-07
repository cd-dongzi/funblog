<template>
    <transition name="toast">
        <GlobalMask v-if="show" @click.native="cancel">
            <div class="toast" @click.stop="">
                <div class="toast-title" v-show="title">{{title}}</div>
                <div class="toast-content" v-show="content">{{content}}</div>
                <button class="btn-clear toast-success" @click="cancel">确定</button>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            title: '提示',
            content: ''
        }
    },
    methods: {
        cancel () {
            this.show = false
        }
    }
}
</script>
<style lang="less">
    .toast-enter, .toast-leave-active {
        opacity: 0;
        .toast {
            transform: translateY(-10%);
        }
    }
    .toast-enter-active, .toast-leave-active {
        transition: opacity .5s;
    }
    .toast {
        margin: 0 auto;
        margin-top: 100px;
        width: 300px;
        background-color: #d8d8d8;
        padding-bottom: 10px;
        box-shadow: 5px 5px 20px 5px rgba(0, 0, 0, 0.15);
        position: relative;
        border-top: 1px solid transparent;
        border: 2px solid #dad3d3;
        transition: transform .5s;
        .toast-close {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
            position: absolute;
            bottom: 100%;left: 100%;
            transform: translate(-50%, 50%);
            svg {
                font-size: 16px;
                color: #999;
            }
        }
        .toast-title {
            text-align: center;
            margin-top: 15px;
            color: #715151;
        }
        .toast-content {
            text-align: center;
            margin-top: 20px;
            padding: 0 20px;
            color: #756d6d
        }
        .toast-success {
            display: block;
            margin: 0 auto;
            margin-top: 20px;
            width: 100px;
            line-height: 35px;
            text-align: center;
            border-radius: 20px;
            color: #fff;
            background: linear-gradient(left, #c3c1bc, #d2b6a9 100%);
        }
    }
</style>