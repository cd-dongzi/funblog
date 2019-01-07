<template>
    <div class="home-entry bg bg-cover df-col-c" :style="{backgroundImage: `url(${require('assets/images/background/home.jpg')})`, height}">
        <div class="title">
            {{currTitle}}
            <span :class="{active: titleIsLoadCompleted}">？</span>
        </div>
        <div v-if="currStep === 1" class="step1">
            <ul>
                <li class="animated lightSpeedIn" 
                    v-for="(item, index) in steps" :key="index" 
                    :style="{animationDelay: index*0.5+'s'}" 
                    @click="skip(item)">{{item.title}}
                </li>
            </ul>
        </div>
        <!-- <div v-if="isLookAll" class="center-point"></div> -->
    </div>
</template>
<script>
    export default {
        name: 'Home',
        data() {
            return {
                title: '客官，需要看点什么吗',
                currTitle: '',
                titleIsLoadCompleted: false,
                currStep: 0,

                steps: [{
                        title: '欣赏音乐',
                        path: '/music'
                    },
                    {
                        title: '点评博客',
                        path: '/blog'
                    },
                    {
                        title: '通通都要',
                        path: '/'
                    },
                ]
            }
        },
        computed: {
            height () {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.screen.height + 'px'
                }else{
                    return '100%'
                }
            }
        },
        inject: ['reload'],
        created () {
            this.$store.commit('SET_LIVE2D_STATUS', {show: false})
            this.$store.commit('SET_MUSICBOX_STATUS', {show: false})
        },
        mounted() {
            this.startAskQuestion()
        },
        methods: {
            skip (item) {
                this.$store.commit('SET_LIVE2D_STATUS', {show: true})
                this.$store.commit('SET_MUSICBOX_STATUS', {show: true})
                if (item.path === '/') {
                    this.reload(item.path)
                }else{
                    this.$router._skip(item.path)
                }
            },
            startAskQuestion() {
                let index = 0
                let timer = setInterval(() => {
                    if (index >= this.title.length) {
                        clearInterval(timer)
                        this.titleIsLoadCompleted = true
                        this.currStep++
                            return
                    }
                    this.currTitle += this.typingEffect(index)
                    index++
                }, 80)
            },
            typingEffect(index) {
                return this.title[index]
            }
        }
    }
</script>
<style lang="less">
    .home-entry {
        width: 100%;
        position: absolute;
        .title {
            font-size: 30px;
            color: #fff;
            text-align: center;
            span {
                opacity: 0;
                transition: all 1.5s;
                &.active {
                    opacity: 1;
                }
            }
            .question {
                width: 100%;
                margin: 0 auto;
                padding-top: 15px;
                display: block;
                background: 0;
                border: 0;
                border-bottom: 2px solid #fff;
                color: #fff;
                font-weight: 500;
                outline: 0;
                text-align: center;

            }

        }

        .step1 {
            color: #fff;
            font-size: 20px;
            li {
                margin: 20px;
                transition: color .5s;
                &:hover {
                    color: #888;
                    cursor: pointer;
                }
            }
        }

        .center-point {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #fff;
        }
    }
</style>
