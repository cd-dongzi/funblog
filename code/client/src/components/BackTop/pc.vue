<template>
    <div id="back-top" @click="back" :style="{bottom}"></div>
</template>
<script>
    export default {
        data () {
            return {
                isBack: true
            }
        },
        computed: {
            maxBottom () {
                if (typeof window !== 'undefined') {
                    let winH = this.$store.state.system.screen.height || 0
                    if (winH < 1150) {
                        return 250
                    }else{
                        let distance = winH - 1150
                        return 250 + distance
                    }
                }else{ 
                    return 0
                }
            },
            bottom () {
                if (this.isBack) {
                    return '100%'
                }else{
                    return `${this.maxBottom}px`
                }
            }
        },
        mounted () {
            window.addEventListener('scroll', this.onScroll)
        },
        methods: {
            onScroll () {
                let scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                    scrollH = document.documentElement.scrollHeight || document.body.scrollHeight,
                    winH = document.documentElement.clientHeight || document.body.clientHeight
                
                if (scrollTop > winH/2) {
                    this.isBack = false
                }else{
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
        width: 70px;
        height: 900px;
        right: 0;
        background-image: url('../../assets/images/back-top.png');
        transition: bottom 1s;
    }
</style>