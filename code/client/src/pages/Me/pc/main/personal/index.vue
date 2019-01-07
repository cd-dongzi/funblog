<template>
    <div class="me-personal">
        <div class="me-row cf">
            <section class="me-col-left">
                <LittleBuddha id="buddha"></LittleBuddha>
                <ul class="contacts">
                    <li class="me-item" v-for="(item, index) in contacts" :key="index">
                        <span>{{item.title}}：</span>
                        <Link v-if="item.link" class="me-item-text" :href="item.link">{{item.value}}</Link>
                        <span v-else class="me-item-text" @click="copy(item.value)">{{item.value}}</span>
                    </li>
                    <!-- <li class="me-item intro-item" v-for="(item, index) in property" :key="index+2">
                        <span>{{item.title}}</span>
                        <span class="me-item-text">{{item.value}}</span>
                    </li> -->
                </ul>
            </section>
            <!-- <section class="me-col-right fr">
                <ul>
                    <li v-for="(item, index) in property" :key="index">
                        <span>{{item.title}}</span>
                        <span>{{item.desc}}</span>
                    </li>
                </ul>
            </section> -->
        </div>
    </div>
</template>
<script>
    import LittleBuddha from 'components/LittleBuddha'
    import ClipboardJS from 'clipboard'
    export default {
        components: {
            LittleBuddha
        },
        data() {
            return {
                contacts: [{
                        title: 'Q   Q',
                        value: 'MTI2MjQ5ODMxOQ=='
                    },
                    {
                        title: 'Email',
                        value: '15273119291@163.com'
                    },
                    {
                        title: 'Github',
                        link: 'https://github.com/cd-dongzi',
                        value: '点我查看详情'
                    },
                    {
                        title: 'SegmentFault',
                        link: 'https://segmentfault.com/u/zi_597d64ce14187',
                        value: '点我查看详情'
                    },
                    // {
                    //     title: '掘金',
                    //     link: 'https://juejin.im/user/5a73e0335188257a7e3ef88f',
                    //     value: '点我查看详情'
                    // }
                ],
                property: [
                    {title: '爱好：', value: '阿萨德'}
                ],
                copyText: ''
            }
        },
        mounted() {
            this.initClipboard()
        },
        methods: {
            copy(text) {
                this.copyText = text
            },
            initClipboard() {
                const clipboard = new ClipboardJS('.me-item-text', {
                    text: (trigger) => {
                        return this.copyText
                    }
                });
                clipboard.on('success', this.clipboardSuccess)
                clipboard.on('error', this.clipboardCancel)
            },
            clipboardSuccess() {
                this.$notification('复制成功：' + this.copyText)
            },
            clipboardCancel() {
                this.$notification('复制失败!!!')
            }
        }
    }
</script>
<style lang="less">
    .me-personal {
        width: 90%;
        margin: 20px auto;
        padding: 30px 20px;
        border-radius: 10px;
        background-color: #fff;
    }

    #buddha {
        margin: 0 auto;
    }

    @leftW: 340px;
    .me-col-left {
        // width: @leftW;
        .contacts {
            margin-top: 40px;
            padding-left: 20px;
        }
        .me-item {
            margin: 10px 0;
            color: @vice-color;
            &.intro-item {
                margin-top: 20px;
            }
        }
        .me-item-text {
            color: @vice-color;
            font-size: 14px;
            &:hover {
                color: @theme-color;
                text-decoration: underline;
                cursor: pointer;
            }
            &[href]{
                font-size: 14px;
            }
        }
    }

    .me-col-right {
        width: calc(~'100% - @{leftW}');
        border-left: 1px solid #ccc;
        padding-left: 20px;
        color: @vice-color;
    }
</style>