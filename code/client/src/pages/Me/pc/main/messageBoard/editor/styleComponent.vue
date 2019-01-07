<template>
    <transition name="editor-style">
        <GlobalMask class="df-c" @click.native="$emit('update:show', false)" v-show="show">
            <div class="editor-style" @click.stop="">
                <!-- <IconSvg name="guanbi" class="close" @click.native="$emit('update:show', false)"></IconSvg> -->
                <div class="editor-style-container fmt" v-html="html"></div>
            </div>
            <!-- <div class="editor-style fmt" @click.stop="">{{msg}}-{{html}}</div> -->
        </GlobalMask>
    </transition>
</template>
<script>
import marked from 'marked'
import highlightJs from 'highlight.js'
// console.log(import('marked'))
// console.log(import('highlight.js'))
export default {
    props: ['show', 'msg'],
    computed: {
        html () {
            return this.formatHtml(this.msg)
        }
    },
    mounted () {
        this.$emit('mounted')
    },
    watch: {
        show () {
            if (this.show) {
                this.$emit('mounted')
            }
        }
    },
    methods: {
        formatHtml (msg) {
            marked.setOptions({
                renderer: new marked.Renderer(),
                gfm: true, //允许 Git Hub标准的markdown.
                tables: true, //允许支持表格语法。该选项要求 gfm 为true。
                breaks: true, //允许回车换行。该选项要求 gfm 为true。
                pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
                sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
                smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
                smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
                highlight: function (code) {
                    return highlightJs.highlightAuto(code).value
                }
            })
            return marked(msg)
        }
    }
}
</script>
<style lang="less">
    .editor-style-enter, .editor-style-leave-active {
        opacity: 0;
        .editor-style {
            transform: translateY(-80px);
        }
    }
    .editor-style-enter-active, .editor-style-leave-active {
        transition: opacity .5s;
    }
    .editor-style {
        max-width: 700px;
        min-width: 400px;
        padding: 20px;
        border-radius: 10px;
        background-color: #fff;
        transition: transform .5s;
        position: relative;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
        // .close {
        //     font-size: 20px;
        //     position: absolute;
        //     right: 10px;top: 10px;
        //     color: #333;
        // }
    }
</style>