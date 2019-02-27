<template>
    <transition name="message-animate">
        <GlobalMask class="df-c" v-if="show" @click.native="$emit('update:show', false)" color="rgba(0, 0, 0, 0.2)">
            <div id="leave-message" class="leave-message" @click.stop="">
                <div class="item name">
                    <input class="input-clear" type="text" placeholder="Name" v-model="info.name" maxlength="20">
                </div>
                <div class="item msg">
                    <textarea class="input-clear" placeholder="Say something ..." v-model="info.msg" maxlength="200"></textarea>
                </div>
                <div class="item email">
                    <input class="input-clear" type="email" placeholder="Email不会被公开显示" v-model="info.email" maxlength="50">
                </div>
                <div class="item url">
                    <input class="input-clear" type="text" placeholder="Url将会当做名字外链使用" v-model="info.url" maxlength="50">
                </div>
                <div class="item qq">
                    <input class="input-clear" type="number" placeholder="QQ不会被公开显示" v-model="info.qq" maxlength="20">
                </div>
                <!-- <div class="item wechat">
                    <input class="input-clear" type="text" placeholder="wechat" v-model="info.wechat" maxlength="30">
                </div> -->
                <div class="item city">
                    <input class="input-clear" type="text" placeholder="City不会被公开显示" v-model="info.city" maxlength="20">
                </div>
                <button type="button" class="btn-clear submit hover" @click="submit">提交</button>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
    import {
        checkStr,
        filterHTMLTag,
        checkpersonalInfo
    } from '@/utils/string'
    import {randNumber} from 'utils/number'
    import Message from '@/api/message'
    import sensitiveWords from '@/config/sensitiveWords'
    const initInfo = {
        name: '',
        email: '',
        city: '',
        qq: '',
        wechat: '',
        url: '',
        msg: ''
    }
    export default {
        props: ['show'],
        data() {
            return {
                info: {}
            }
        },
        mounted () {
            this.initInfo()
        },
        methods: {
            initInfo () {
                this.info = Object.assign({}, initInfo, this.$store.state.user.info)
            },
            async submit() {
                let msg = checkpersonalInfo(this.info)
                if (msg) {
                    this.$toast(msg)
                    return
                }
                this.info.msg = filterHTMLTag(this.info.msg)// 是作者本人
                if (this.info.name === 'DongZi') {
                    this.info.name = '作者'
                    this.info.isAuthor = true
                    this.info.avatar = 0
                }else {
                    if (!this.info.avatar) {
                        this.info.avatar = randNumber(1, 21)
                    }
                }
                await this.addMessage(this.info)
                this.$emit('update:show', false)
                this.$emit('addMessage', this.info)
                this.initInfo()
            },
            addMessage(params) {
                return new Promise(async (resolve, reject) => {
                    const res = await Message.addMessage(params)
                    resolve()
                })
            }
        }
    }
</script>
<style lang="less">
    .message-animate-enter, .message-animate-leave-active {
        opacity: 0;
        .leave-message {
            transform: translateX(-10%);
        }
    }
    .message-animate-enter-active {
        transition: opacity .5s;
    }
    .message-animate-leave-active {
        transition: opacity .5s;
        .leave-message {
            transform: translateX(10%);
        }
    }
    .leave-message {
        border-radius: 20px;
        background-color: #fff;
        padding: 50px;
        padding-bottom: 20px;
        width: 500px;
        text-align: center;
        box-shadow: 0px 20px 35px 0px rgba(0, 0, 0, 0.3);
        transition: transform .5s;
        .item {
            position: relative;
            color: #657786;
            font-size: 12px;
            input,
            textarea {
                border: 1px solid #e1e8ed;
                border-radius: 20px;
                padding: 12px;
                margin: 15px 0;
                width: 400px;
            }
            textarea {
                height: 80px;
                resize: none;
            }

        }
        .name,
        .msg {
            &:before {
                content: '*';
                position: absolute;
                right: e("calc(100% + 10px)");
                top: 50%;
                transform: translateY(-50%);
            }
        }
        .submit {
            margin-top: 10px;
            width: 100px;
            height: 40px;
            background: @btn-linear-gradient;
            border-radius: 20px;
            line-height: 40px;
            color: #fff;
        }
    }
</style>