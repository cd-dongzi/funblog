<template>
    <div id="msg-box" class="msg-box df-c" :class="{active: showMsg}">
        <span class="msg" v-html="msg"></span>
        <span class="dot bot"></span>
        <span class="dot top"></span>
    </div>
</template>
<script>
    import famousQuotes from './famousQuotes'
    import {randNumber} from 'utils/number'
    export default {
        data() {
            return {
                msg: '', // 信息
                showMsg: false, // 显示信息框
                timer: null, // 定时器
                famousQuotes: {
                    timer: null,
                    index: 0
                }
            }
        },
        mounted() {
            this.onSource()
            this.onConsole()
            this.onCopy()
            this.$bus.$on('onShowMsg', this.onShowMsg)
        },
        methods: {
            onShowMsg(text) {
                clearTimeout(this.famousQuotes.timer)
                if (this.timer) {
                    clearTimeout(this.timer)
                }
                this.showMsg = true
                this.msg = text
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer)
                    this.showMsg = false
                    this.timer = null
                    this.randomFamousQuotes()
                }, 3000)
            },
            // 随机名言名句
            randomFamousQuotes () {
                let index = randNumber(0, famousQuotes.length)
                while(index === this.famousQuotes.index) {
                    index = randNumber(0, famousQuotes.length)
                }
                this.famousQuotes.index = index
                this.famousQuotes.timer = setTimeout(() => {
                    this.onShowMsg(famousQuotes[this.famousQuotes.index])
                }, 15000)
            },
            // AI回答
            aiResult(res) {
                const text = res.map(item => item.values.text).join(',')
                this.onShowMsg(text)
            },
            // 复制
            onCopy() {
                document.addEventListener('copy', () => {
                    this.onShowMsg('你都复制了些什么呀，转载要记得加上出处哦~~')
                })
            },
            // 打开控制台
            onConsole() {
                let devtools = /./
                devtools.toString = () => {
                    this.onShowMsg('哈哈，你打开了控制台，是想要看看我的秘密吗？')
                }
                console.log('%c', devtools)
            },
            // 来源
            onSource() {
                let text = ''
                if (document.referrer !== '') {
                    text = this.hasReferrer()
                } else {
                    text = this.noReferrer()
                }
                this.onShowMsg(text)
            },
            // 需要 https, 同源才能获取 referrer
            hasReferrer() {
                let referrer = document.createElement('a'),
                    domain = referrer.hostname.split('.')[1],
                    color = '#0099cc',
                    text = '嗨！来自 <span style="color:' + color + ';">' + referrer.hostname + '</span> 的朋友！'

                referrer.href = document.referrer;
                if (domain == 'baidu') {
                    text = '嗨！ 来自 百度搜索 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[
                        0] + ' 」</span>';
                } else if (domain == 'so') {
                    text = '嗨！ 来自 360搜索 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[
                        0] + ' 」</span>';
                } else if (domain == 'google') {
                    text = '嗨！ 来自 谷歌搜索 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[
                        0] + ' 」</span>';
                } else if (domain == 'juejin') {
                    text = '嗨！ 来自 掘金 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[0] +
                        ' 」</span>';
                } else if (domain == 'zhihu') {
                    text = '嗨！ 来自 知乎 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[0] +
                        ' 」</span>';
                } else if (domain == 'jianshu') {
                    text = '嗨！ 来自 简书 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[0] +
                        ' 」</span>';
                } else if (domain == 'csdn') {
                    text = '嗨！ 来自 CSDN 的朋友！<br>欢迎访问<span style="color:' + color + ';">「 ' + document.title.split(' - ')[
                        0] + ' 」</span>';
                }
                return text
            },
            noReferrer() {
                let now = (new Date()).getHours(),
                    text = ''
                if (now > 23 || now <= 5) {
                    text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛？'
                } else if (now > 5 && now <= 7) {
                    text = '早上好！一日之计在于晨，美好的一天就要开始了！'
                } else if (now > 7 && now <= 11) {
                    text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！'
                } else if (now > 11 && now <= 14) {
                    text = '中午了，工作了一个上午，现在是午餐时间！'
                } else if (now > 14 && now <= 17) {
                    text = '午后很容易犯困呢，今天的运动目标完成了吗？'
                } else if (now > 17 && now <= 19) {
                    text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~~'
                } else if (now > 19 && now <= 21) {
                    text = '晚上好，今天过得怎么样？'
                } else if (now > 21 && now <= 23) {
                    text = '已经这么晚了呀，早点休息吧~~'
                } else {
                    text = '嗨~ 快来逗我玩吧！'
                }
                return text
            }
        }
    }
</script>
<style lang="less">
    @chatW: 250px;
    @chatH: 150px;
    #msg-box {
        width: @chatW;
        height: @chatH;
        margin-bottom: 60px;
        background-color: #beceeb;
        position: relative;
        border-top-right-radius: @chatW @chatH;
        border-top-left-radius: @chatW @chatH;
        border-bottom-right-radius: @chatW @chatH;
        border-bottom-left-radius: @chatW @chatH;
        transition: all 1s ease-in-out;
        opacity: 0;
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        &.active {
            opacity: 1;
        }
        .msg {
            display: block;
            line-height: 20px;
            padding: 0 20px;
            color: #555;
        }
        .dot {
            width: 0;
            height: 0;
            font-size: 0;
            background-color: #beceeb;
            overflow: hidden;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            @midW: 30px;
            @smallW: 15px;
            &.bot {
                width: @midW;
                height: @midW;
                border-radius: @midW;
                bottom: -40px;
            }
            &.top {
                width: @smallW;
                height: @smallW;
                border-radius: @smallW;
                bottom: -60px;
            }
        }
    }
</style>