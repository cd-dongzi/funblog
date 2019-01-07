<template>
    <transition name="chat-slide">
        <GlobalMask v-if="show" class="df-c" @click.native="close" color="rgba(0, 0, 0, .5)">
            <div id="chat-box" @click.stop="">
                <div class="close df-c hover" @click="close">
                    <IconSvg name="guanbi"></IconSvg>
                </div>
                <IconSvg class="chat-logo" name="essencequestion"></IconSvg>
                <!-- <div class="chat-box-t">你可以向我提问哦~</div> -->
                <div class="chat-box-t">快来和我互动哦~</div>
                <textarea class="input-clear input" v-model="text"></textarea>
                <button class="btn-clear btn border-1px-t hover" @click="getResult">
                    <FontLoading text="寻找答案中..." v-if="isLoading"></FontLoading>
                    <span v-else>互动</span>
                </button>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
    import Ai from '@/api/ai'
    import FontLoading from 'components/Loading/FontAnimate'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        components: {
            FontLoading
        },
        data () {
            return {
                text: '',
                isLoading: false
            }
        },
        methods: {
            close () {
                this.$emit('update:show', false)
            },
            async getResult () {
                if (!this.text) {
                    this.$toast('你咋不问我问题呢？')
                    return
                }
                this.isLoading = true
                const res = await this.submitQuestion()
                this.isLoading = false
                const text = res.map(item => item.values.text).join(',')
                this.$emit('update:show', false)
                this.$bus.$emit('onShowMsg', text)
                this.text = ''
            },
            
            submitQuestion () {
                return new Promise(async resolve => {
                    const res = await Ai.getResult(this.text)
                    resolve(res)
                })
            }
        }
    }
</script>
<style lang="less">
    .chat-slide-enter, .chat-slide-leave-active {
        opacity: 0;
        #chat-box {
            transform: translateY(-10%);
        }
    }
    .chat-slide-enter-active {
        transition: opacity .5s;
    }
    .chat-slide-leave-active {
        transition: opacity .5s;
        #chat-box {
            transform: translateY(10%);
        }
    }
    #chat-box {
        width: 350px; // border-radius: 10px;
        box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
        background-color: #fff;
        position: relative;
        transition: transform .5s;
        .close {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: #fff;
            box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
            position: absolute;
            bottom: 100%;
            left: 100%;
            transform: translate(-50%, 50%);
            svg {
                font-size: 16px;
                color: #999;
            }
        }
        .chat-cover {
            width: 100%;
            height: 200px;
        }
        .chat-logo {
            font-size: 100px;
            display: block;
            margin: 0 auto;
            padding-top: 20px;
            color: @vice-color;
        }
        .chat-box-t {
            height: 50px;
            line-height: 50px;
            color: #333;
            font-size: 14px;
            padding: 0 20px;
            text-align: center;
        }
        .input {
            width: calc(~'100% - 40px');
            height: 50px;
            padding: 5px;
            text-indent: 1em;
            line-height: 20px;
            border: 1px solid #ccc;
            resize: none;
            border-radius: 4px;
            margin: 0px 20px 20px 20px;
            font-size: 14px;
        }
        .btn {
            width: 100%;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            color: #625454;
        }
    }
</style>