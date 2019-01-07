<template>
    <div class="live2d-tools df-col-c" 
        :class="{show: show}"
        @mouseover="mouseover" 
        @mouseout="mouseout">
        <button class="btn-clear btn" 
            :style="{transitionDelay: `${0.1*index}s`}"
            :class="{disabled: item.disabled}"
            :disabled="item.disabled || isHideLoading" 
            v-for="(item, index) in tools" :key="index" 
            @click="setting(item)" 
            @mouseover="showMsg(item)">
            <IconSvg :name="item.icon"></IconSvg>
            <!-- <span>{{item.title}}</span> -->
        </button>
    </div>
</template>
<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        showChatBox: Boolean
    },
    data () {
        return {
            showBtns: true, // 显示按钮
            tools: [
                {icon: 'chat', title: '聊天', type: 'chat', msg: '想跟我聊天吗', disabled: false},
                {icon: 'assignRoles', title: '切换角色', type: 'role', msg: '要切换看板娘吗？', disabled: false, timer: null},
                {icon: 'ziyuan', title: '换装', type: 'dressUp', msg: '喜欢换装PLAY吗', disabled: false, timer: null},
                {icon: 'hide', title: '隐藏', type: 'hide', msg: '到了说再见的时候吗？', disabled: false}
            ],
            isHideLoading: false
        }
    },
    methods: {
        setting (item) {
            switch (item.type) {
                case 'chat':
                    this.chat()
                    break;
                case 'role':
                    this.switchRole(item)
                    break;
                case 'dressUp':
                    this.dressUp(item)
                    break;
                case 'hide':
                    this.hide()
                    break;
            }
        },
        showMsg (item) {
            this.$bus.$emit('onShowMsg', item.msg)
        },
        // 开启聊天
        chat () {
            this.$emit('update:showChatBox', true)
        },
        // 切换角色
        switchRole (item) {
            this.$emit('switchRole')
            item.disabled = true
            item.timer = setTimeout(() => {
                clearTimeout(item.timer)
                item.disabled = false
            }, 2000)
        },
        // 换装
        dressUp (item) {
            this.$emit('dressUp')
            item.disabled = true
            item.timer = setTimeout(() => {
                clearTimeout(item.timer)
                item.disabled = false
            }, 2000)
        },
        // 隐藏live2D
        hide () {
            this.$bus.$emit('onShowMsg', '拜拜咯，下次再见哦！')
            this.isHideLoading = true
            setTimeout(() => {
                this.isHideLoading = false
                this.$store.commit('SET_LIVE2D_STATUS', {show: false})
            }, 1000)
        },
        mouseover () {
            this.$emit('update:show', true)
        },
        mouseout () {
            this.$emit('update:show', false)
        }
    }
}
</script>
<style lang="less">
@keyframes live2dToolGo {
    0% { transform: translateX(-20px);opacity: 0; }
    100% { transform: translateX(0px);opacity: 1; }
}
@keyframes live2dToolBack {
    0% { transform: translateX(0px);opacity: 1; }
    100% { transform: translateX(-20px);opacity: 0; }
}
#live2d-box {
    .live2d-tools {
        height: 250px;
        position: absolute;
        z-index: 10;
        left: 20px;
        bottom: 0px;
        .btn {
            display: block;
            border-radius: 4px;
            color: #fff;
            text-align: left;
            color: @theme-color;
            font-size: 25px;
            line-height: 40px;
            margin-left: -20px;
            transition: all .5s;
            opacity: 0;
            &:hover {
                transform: scale(1.3);
                cursor: pointer;
            }
            &.disabled {
                color: #8c7f7f;
                cursor: wait;
                &:hover {
                    transform: scale(1);
                }
            }
        }
        &.show {
            .btn {
                margin-left: 0;
                opacity: 1;
            }
        }
    }
}
</style>