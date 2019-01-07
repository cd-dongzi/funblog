<template>
    <transition name="reply-editor">
        <div class="r-editor-box">
            <textarea class="input-clear r-editor" 
                ref="text"
                :class="{focus: isFocus}" 
                v-model="replyValue" @focus="focus" 
                maxlength="300" :placeholder="isFocus ? 'Say something ...' : '我也说一句...'"
                @keydown.tab="tabMarkdown"></textarea>
            <div class="r-editor-foot df-sb" v-show="isFocus">
                <div class="r-editor-num">{{replyValue.length}}/300</div>
                <div class="r-editor-btns align-c">
                    <button class="btn-clear cancel" @click="cancel">取消</button>
                    <button class="btn-clear submit" @click="submit">确认发送</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import { filterHTMLTag } from '@/utils/string'
    import LeaveMessage from '@/api/leave_message'
    import sensitiveWords from '@/config/sensitiveWords'
    export default {
        props: {
            info: Object
        },
        data () {
            return {
                isFocus: false,
                replyValue: '',
                textarea: null
            }
        },
        mounted () {
            this.textarea = this.$refs.text
            this.$bus.$on('confirmReplyFinish', async info => {
                await this.updatePersonal(info)
                this.replyValue = ''
                this.isFocus = false
                this.$bus.$emit('addLeaveMessage')
            })
        },
        methods: {
            submit () {
                let msg = ''
                if (!this.replyValue.trim()) {
                    msg = '请输入回复信息'
                }
                let word = sensitiveWords.find(word => this.replyValue.indexOf(word) >= 0)
                if (word) {
                    msg = `存在非法词：${word}`
                }
                if (msg) {
                    this.$toast(msg)
                    return
                }
                
                this.isFocus = true
                this.$bus.$emit('confirmInfo', 'reply')
            },
            cancel () {
                this.isFocus = false
            },
            focus () {
                this.isFocus = true
            },
            // 回复评论
            updatePersonal (info) {
                info._id = this.info._id
                info.msg = filterHTMLTag(this.replyValue)
                info.createTime = new Date()
                
                delete this.info.reply_list
                info.questioner = this.info
                return new Promise(async resolve => {
                    const res = await LeaveMessage.updateLeaveMessage(info)
                    resolve()
                })
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
            }
        }
    }
</script>
<style lang="less">
    .reply-editor-enter, .reply-editor-leave-active {
        opacity: 0;
        transform: translateY(-10px);
    }
    .reply-editor-enter-active, .reply-editor-leave-active {
        transition: all .5s;
    }
    .r-editor-box {
        width: 100%;
        margin: 0 auto;
        padding-bottom: 10px;
        .r-editor {
            width: 100%;
            display: block;
            resize: none;
            height: 34px;
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
            &::-webkit-scrollbar-thumb {
                background-color: transparent;
            }
            &.focus {
                border: 1px solid @vice-color;
                box-shadow: 0 0 3px 0px @vice-color;
                height: 70px;
            }
        }
        .r-editor-num {
            font-size: 12px;
            color: #998f8f;
        }
        .r-editor-btns {
            .submit {
                line-height: 28px;
                font-size: 14px;
                color: @vice-color;
                &:hover {
                    color: @theme-color;
                    cursor: pointer;
                }
            }
            .cancel {
                line-height: 28px;
                font-size: 12px;
                color: #998f8f;
                margin-right: 10px;
                &:hover {
                    opacity: 0.8;
                    cursor: pointer;
                }
            }
        }
    }
</style>