<template>
    <div class="send-box df-c">
        <input type="text" class="barrage-input" placeholder="弹幕发送*~(^v^)~*" v-model="info.msg" @keydown.enter="send" maxlength="50">
        <button class="barrage-btn hover" @click="send">
            <span v-if="!isLoading">发送</span>
            <IconSvg name="loading" class="barrage-loading" v-else></IconSvg>
        </button>
    </div>
</template>
<script>
    import Barrage from '@/api/barrage'
    import sensitiveWords from '@/config/sensitiveWords'
    const initInfo = {
        msg: ''
    }
    export default {
        data () {
            return {
                info: {...initInfo},
                isLoading: false
            }
        },
        methods: {
            async send() {
                if (this.isLoading) return
                let msg = ''
                if (!this.info.msg) {
                    msg = '请输入弹幕!'
                }
                let word = sensitiveWords.find(word => this.info.msg.indexOf(word) >= 0)
                if (word) {
                    msg = `存在非法词：${word}`
                }
                if (msg) {
                    this.$toast(msg)
                    return
                }
                this.isLoading = true
                await this.addBarrage(this.info)
                this.isLoading = false
                this.$bus.$emit('addBarrage', {
                    type: 'add',
                    data: [this.info]
                })
                this.info = {...initInfo}
            },
            addBarrage (params) {
                return new Promise(async (resolve) => {
                    const res = await Barrage.addBarrage(params)
                    resolve()
                })
            }
        }
    }
</script>
<style lang="less">
    .send-box {
        width: 100%;
        margin-top: 20px;
        @h: 40px;
        .barrage-input {
            width: 60%;
            max-width: 500px;
            height: @h;
            line-height: @h;
            background-color: rgba(255, 255, 255, .7);
            box-shadow: 0px 0px 5px #c1866a;
            border: none;
            text-indent: 1em;
            outline: none;
            caret-color: @theme-color;
        }
        .barrage-btn {
            width: 100px;
            height: @h;
            color: #fff;
            line-height: @h;
            background: @btn-linear-gradient;
            outline: none;
            border: none;
            margin-left: 20px;
            border-radius: 5px;
        }
        .barrage-loading {
            animation: rotate360 1s linear infinite;
        }
    }
</style>