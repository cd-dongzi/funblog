import marked from 'marked'
import highlight from 'highlight.js'
marked.seOtptions({
    renderer: new marked.Renderer(),
    gfm: true, //允许 Git Hub标准的markdown.
    tables: true, //允许支持表格语法。该选项要求 gfm 为true。
    breaks: true, //允许回车换行。该选项要求 gfm 为true。
    pedantic: false, //尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    sanitize: true, //对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    smartLists: true, //使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false, //使用更为时髦的标点，比如在引用语法中加入破折号。
    highlight: function (code) {
        return highlight.highlightAuto(code).value
    }
})

export default marked