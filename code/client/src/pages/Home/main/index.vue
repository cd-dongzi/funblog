<template>
    <div class="home-main" :class="[`home-main-${screenSize}`]">
        <Navigation></Navigation>
        <div class="cf" v-if="showPC">
            <div class="col-left fl">
                <Box v-for="(item, index) in leftCols" :key="index" :item="item"></Box>
            </div>
            <div class="col-right fr">
                <Box v-for="(item, index) in rightCols" :key="index" :item="item"></Box>
            </div>
        </div>
        <div v-if="showMobile">
            <Box v-for="(item, index) in list" :key="index" :item="item"></Box>
        </div>
    </div>
</template>
<script>
import Box from './box'
import setShowMixin from '@/mixins/setShow'
import Navigation from 'components/Navigation'
export default {
    mixins: [setShowMixin],
    components: {
        Box,
        Navigation
    },
    data () {
        return {
            showMobile: false,
            showPC: false,
            list: [
                { icon: 'jiaoyu_educational', name: 'Blog', path: '/blog', color: '#d98719', cover: require('assets/images/cover/blog.jpeg') },
                { icon: 'music', name: 'Music', path: '/music', color: '#2f2f4f', cover: require('assets/images/cover/music.jpeg') },
                { icon: 'message', name: 'Message', path: '/message', color: '#409eff', cover: require('assets/images/cover/message.jpeg') },
                { icon: 'me', name: 'Me', path: '/me', color: '#ff7f00', cover: require('assets/images/cover/me.jpeg') },
                { icon: 'guidang', name: 'Archiving', path: '/archiving', color: '#786d5d', cover: require('assets/images/cover/archiving.jpeg') },
                { icon: 'example', name: 'Example', path: '/example', color: '#2f2f4f', cover: require('assets/images/cover/example.jpeg') }
            ]
        }
    },
    computed: {
        screenSize() {
            if (typeof window !== "undefined") {
                return this.$store.state.system.screenSize
            }
            return ''
        },
        leftCols () {
            return this.list.filter((item, index) => index%2===0)
        },
        rightCols () {
            return this.list.filter((item, index) => index%2===1)
        }
    },
    methods: {
        setShow () {
            const bol = this.screenSize === 'sm'
            this.showMobile = bol
            this.showPC = !bol
        }
    }
}
</script>
<style lang="less">
.home-main {
    padding-top: 20px;
    padding-bottom: 30px;
    &.home-main-sm {
        width: 3.5rem;
        max-width: 350px;
        margin: 0 auto;
    }
    &.home-main-lg {
        width: 740px;
        margin: 0 auto;
        .col-left {
            width: 350px;
        }
        .col-right {
            padding-top: 200px;
            width: 350px;
        }
    }
}
</style>
