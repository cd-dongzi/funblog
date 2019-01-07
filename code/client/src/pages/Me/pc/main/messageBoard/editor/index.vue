<template>
    <div class="editor-box">
        <textarea class="input-clear editor" ref="text" v-model="info.msg" placeholder="同道中人，理性留言！！！" @keydown.tab="tabMarkdown"></textarea>
        <div class="editor-foot df-sb">
            <div class="editor-tip align-c">
                <IconSvg name="prompt"></IconSvg>
                <span>可使用部分markdown语法</span>    
            </div>
            <div>
                <button class="btn-clear look-style" :class="{loading: styleComponent.loading}" @click="lookStyle">
                    <span>预览</span>
                    <IconSvg name="loading" class="btn-loading"></IconSvg>
                </button>
                <button class="btn-clear hover submit" :class="{loading: isLoading}" @click="submit">
                    <span>发布评论</span>
                    <IconSvg name="loading" class="btn-loading"></IconSvg>
                </button>
            </div>
        </div>
        <StyleComponent v-if="styleComponent.init" :show.sync="styleComponent.show" :msg="info.msg" @mounted="styleComponent.loading=false"></StyleComponent>
    </div>
</template>
<script>
    import { filterHTMLTag } from '@/utils/string'
    import sensitiveWords from '@/config/sensitiveWords'
    import LeaveMessage from '@/api/leave_message'
    export default {
        components: {
            StyleComponent: resolve => require(['./styleComponent'], resolve)
        },
        data () {
            return {
                info: {
                    msg: ''
                },
                isLoading: false,
                previewLoading: false,
                styleComponent: {
                    show: false,
                    init: false,
                    loading: false
                }
            }
        },
        mounted () {
            this.textarea = this.$refs.text
            this.$bus.$on('confirmMessageFinish', this.addPersonal)
        },
        methods: {
            submit () {
                if (!this.checkMsg()) return
                this.info.msg = filterHTMLTag(this.info.msg)
                this.$bus.$emit('confirmInfo', 'message')
            },
            checkMsg () {
                let msg = ''
                if (!this.info.msg.trim()) {
                    msg = '请输入留言信息'
                }
                let word = sensitiveWords.find(word => this.info.msg.indexOf(word) >= 0)
                if (word) {
                    msg = `存在非法词：${word}`
                }
                if (msg) {
                    this.$toast(msg)
                    return false
                }
                return true
            },
            async addPersonal (info) {
                this.info = Object.assign({}, info, this.info)
                this.isLoading = true
                await this.addLeaveMessage()
                this.isLoading = false
                this.info.msg = ''
                this.$bus.$emit('addLeaveMessage')
            },
            addLeaveMessage () {
                return new Promise(async resolve => {
                    const res = await LeaveMessage.addLeaveMessage(this.info)
                    resolve()
                })
            },
            lookStyle () {
                if (!this.checkMsg()) return
                this.styleComponent = {
                    init: true,
                    show: true,
                    loading: true
                }
            },
            tabMarkdown (e) { // tab键
                e.preventDefault()
                let indent = '    '
                let start = this.textarea.selectionStart
                let end = this.textarea.selectionEnd
                let selected = window.getSelection().toString()
                selected = indent + selected.replace(/\n/g, '\n' + indent)
                this.textarea.value = this.textarea.value.substring(0, start) + selected
                        + this.textarea.value.substring(end);
                this.textarea.setSelectionRange(start + indent.length, start
                        + selected.length)
            },
        }
    }
</script>
<style lang="less">
    .editor-box {
        width: 100%;
        margin: 0 auto;
        .editor {
            width: 100%;
            display: block;
            resize: none;
            max-height: 132px;
            min-height: 90px;
            padding: 6px 12px;
            border-radius: 4px;
            font-size: 14px;
            line-height: 1.42858;
            border: 1px solid #ccc;
            transition: all .5s;
            color: #333;
            &::-webkit-input-placeholder {
                color: #998f8f;
            }
            &:focus {
                border: 1px solid @vice-color;
                box-shadow: 0 0 3px 0px @vice-color;
            }
        }
        .editor-tip {
            font-size: 12px;
            color: #998f8f;
        }
        .look-style {
            font-size: 12px;
            color: @vice-color;
            margin-right: 6px;
            &:hover {
                text-decoration: underline;
                color: @theme-color;
                cursor: pointer;
            }
            span {
                display: inline-block;
            }
            svg {
                display: none;
            }
            &.loading {
                pointer-events: none;
                span {
                    display: none;
                }
                svg {
                    display: inline-block;
                    animation: rotate360 2s linear infinite;
                }
            }
        }
        .submit {
            margin-top: 10px;
            width: 100px;
            height: 34px;
            background: linear-gradient(to left, #c3b69c, #ceaa98 100%);
            border-radius: 17px;
            line-height: 34px;
            font-size: 14px;
            color: #fff;
            span {
                display: inline-block;
            }
            svg {
                display: none;
            }
            &.loading {
                pointer-events: none;
                span {
                    display: none;
                }
                svg {
                    display: inline-block;
                    animation: rotate360 2s linear infinite;
                }
            }
        }
    }
</style>