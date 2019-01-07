<template>
    <div id="back-top" v-show="!isBack" @click="back">
        <IconSvg name="huidaodingbu"></IconSvg>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                isBack: true
            }
        },
        mounted() {
            window.addEventListener('scroll', this.onScroll)
        },
        methods: {
            onScroll() {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    scrollH = document.documentElement.scrollHeight || document.body.scrollHeight,
                    winH = document.documentElement.clientHeight || document.body.clientHeight

                if (scrollTop > winH / 2) {
                    this.isBack = false
                } else {
                    this.isBack = true
                }
            },
            back() {
                document.getElementById('container').scrollIntoView({
                    block: 'start',
                    behavior: 'smooth'
                })
            }
        }
    }
</script>

<style lang="less">
    #back-top {
        cursor: pointer;
        position: fixed;
        z-index: 2;
        right: 0;
        bottom: 40px;
        svg {
            font-size: 40px;
            color: @vice-color;
            transition: color .5s;
            &:hover {
                color: @theme-color;
            }
        }
    }
</style>