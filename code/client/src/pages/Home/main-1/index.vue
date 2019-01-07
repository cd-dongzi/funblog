<template>
    <div class="home-main" :class="[`home-main-${screenSize}`]">
        <div class="home-banner">
            <ul class="cf">
                <li class="fl" v-for="(item, index) in banners" :key="index">
                    <img :src="item.cover">
                </li>
            </ul>
        </div>
        <!-- <div class="home-main-left">
            <Box v-for="(item, index) in list" :key="index" :item="item"></Box>
        </div> -->
    </div>
</template>
<script>
import Box from './box'
export default {
    components: {
        Box
    },
    data () {
        return {
            // list: [
            //     { icon: 'jiaoyu_educational', name: 'Blog', path: '/blog', color: '#d98719', cover: require('assets/images/cover/blog.jpeg') },
            //     { icon: 'music', name: 'Music', path: '/music', color: '#2f2f4f', cover: require('assets/images/cover/music.jpeg') },
            //     { icon: 'message', name: 'Message', path: '/message', color: '#409eff', cover: require('assets/images/cover/message.jpeg') },
            //     { icon: 'me', name: 'Me', path: '/me', color: '#ff7f00', cover: require('assets/images/cover/me.jpeg') },
            //     { icon: 'guidang', name: 'Archiving', path: '/archiving', color: '#786d5d', cover: require('assets/images/cover/archiving.jpeg') },
            //     { icon: 'example', name: 'Example', path: '/example', color: '#2f2f4f', cover: require('assets/images/cover/example.jpeg') }
            // ],
            banners: [
                { icon: 'jiaoyu_educational', name: 'Blog', path: '/blog', color: '#d98719', cover: require('assets/images/cover/blog.jpeg') },
                { icon: 'me', name: 'Me', path: '/me', color: '#ff7f00', cover: require('assets/images/cover/me.jpeg') },
                { icon: 'music', name: 'Music', path: '/music', color: '#2f2f4f', cover: require('assets/images/cover/music.jpeg') },
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
    },
    methods: {

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
        .home-banner {
            li {
                width: calc(~'100% / 3');
                img {
                    width: 100%;
                }
            }
        }
        // .home-main-left {
        //     width: 350px;
        // }
    }
}
</style>
