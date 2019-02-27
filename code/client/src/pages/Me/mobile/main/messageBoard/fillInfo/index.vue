<template>
    <transition name="editor">
        <GlobalMask class="df-c" v-show="show" @click.native="show=false" color="rgba(0, 0, 0, 0.2)">
            <div id="leave-message" class="leave-message" @click.stop="">
                <div class="title">确认信息</div>
                <div class="item name">
                    <input class="input-clear" type="text" placeholder="Name" v-model="info.name" maxlength="20">
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
                <div class="item city">
                    <input class="input-clear" type="text" placeholder="City不会被公开显示" v-model="info.city" maxlength="20">
                </div>
                <button type="button" class="btn-clear submit hover" :class="[type==='message' ? 'message' : 'reply']" @click="submit"></button>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
    import {
        checkStr
    } from '@/utils/string'
    import {randNumber} from 'utils/number'
    import Message from '@/api/message'
    import sensitiveWords from '@/config/sensitiveWords'
    const initInfo = {
        name: '',
        email: '',
        city: '',
        qq: '',
        url: ''
    }
    export default {
        // props: ['show'],
        data() {
            return {
                info: {},
                show: false,
                type: ''
            }
        },
        mounted () {
            this.initInfo()
            this.$bus.$on('confirmInfo',(type) => {
                this.type = type
                this.show = true
                this.initInfo()
            })
        },
        methods: {
            initInfo () {
                this.info = Object.assign({}, initInfo, this.$store.state.user.info)
            },
            async submit() {
                let msg = this.checkpersonalInfo(this.info)
                if (msg) {
                    this.$toast(msg)
                    return
                }
                if (this.info.name === 'DongZi') {
                    this.info.isAuthor = true
                    this.info.avatar = 8
                }else {
                    this.info.isAuthor = false
                    if (!this.info.avatar) {
                        this.info.avatar = randNumber(1, 21)
                    }
                }
                this.show = false
                this.$store.commit('SET_USERINFO', this.info)
                if (this.type === 'message') {
                    this.$bus.$emit('confirmMessageFinish', this.info)
                }else if (this.type === 'reply') {
                    this.$bus.$emit('confirmReplyFinish', this.info)
                }
                
                // this.$emit('addPersonal', this.info)
                // this.$emit('update:show', false)
            },
            checkpersonalInfo (info) {
                let msg = ''
                if (!info.name) {
                    msg = '请输入姓名'
                }else if (info.email && !checkStr(info.email, 'email')) {
                    msg = '请输入正确的邮箱'
                } else if (info.qq && !checkStr(info.qq, 'QQ')) {
                    msg = '请输入正确的QQ号'
                } else if (info.url && !checkStr(info.url, 'URL')) {
                    msg = '请输入正确的Url'
                }
                
                let word = sensitiveWords.concat(['作者']).find(word => info.name.indexOf(word) >= 0)
                if (word) {
                    msg = `存在非法词：${word}`
                }

                //  this.info.questioner = {name, city, email, qq, url}
                return msg
            }
        }
    }
</script>
<style lang="less">
    .editor-enter, .editor-leave-active {
        opacity: 0;
        .leave-message {
            transform: translateY(-10%);
        }
    }
    .editor-enter-active {
        transition: opacity .5s;
    }
    .editor-leave-active {
        transition: opacity .5s;
        .leave-message {
            transform: translateY(10%);
        }
    }
    .leave-message {
        background-color: #fff;
        text-align: center;
        // .item {
        //     position: relative;
        //     color: #657786;
        //     font-size: 12px;
        //     input,
        //     textarea {
        //         border: 1px solid #e1e8ed;
        //         border-radius: 20px;
        //         padding: 12px;
        //         margin: 15px 0;
        //         width: 400px;
        //     }
        //     textarea {
        //         height: 80px;
        //         resize: none;
        //     }

        // }
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
            &.message {
                &:after {
                    content: '确认发布';
                }
            }
            &.reply {
                &:after {
                    content: '确认回复';
                }
            }
        }



        .router-view-lg & {
            border-radius: 20px;
            padding: 20px 50px;
            width: 500px;
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
        }
        .router-view-sm & {
            border-radius: 10px;
            padding: 10px 25px;
            width: 90%;
            box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.3);
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
                    width: 100%;
                }
                textarea {
                    height: 80px;
                    resize: none;
                }

            }
        }
    }
</style>