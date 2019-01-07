<template>
    <div id="layout">
        <!-- 导航栏 -->
        <Navigation v-if="showNavigation"></Navigation>

        <!-- 音频播放器 -->
        <AudioPlayer></AudioPlayer>

        <!-- 音乐盒 -->
        <MusicBox v-if="showPC" v-show="showMusicBox"></MusicBox>

        <!-- 看板娘 -->
        <Live2D v-if="showPC" v-show="showLive2D"></Live2D>

        <transition :name="transition">
            <keep-alive :include="keepAliveIncludeList">
                <router-view class="router-view" v-if="isRouterAlive" :style="{minHeight}"></router-view>
            </keep-alive>
        </transition>

        <BackTop></BackTop>

        <!-- 底部bar -->
        <FooterBar v-show="showFooter"></FooterBar>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import setShowMixin from '@/mixins/setShow'
    import Navigation from 'components/Navigation'
    import AudioPlayer from 'components/AudioPlayer'
    import BackTop from 'components/BackTop'
    import FooterBar from './footerBar'
    import config from '@/config/index'
    export default {
        name: 'Loyout',
        mixins: [setShowMixin],
        components: {
            Navigation,
            AudioPlayer,
            BackTop,
            FooterBar,
            MusicBox: resolve => require(['components/MusicBox/index.vue'], resolve),
            Live2D: resolve => require(['components/Live2D/index.vue'], resolve)
        },
        data() {
            return {
                isRouterAlive: true,
                keepAliveIncludeList: config.keepAliveIncludeList,
                // mobile导航白名单
                naviagtionPathList: [
                    '/archiving',
                    '/message',
                    '/me',
                    '/song',
                    '/article',
                    '/example'
                ],
                footerBlackList: [
                    '/me',
                    '/message'
                ],
                showPC: false
            }
        },
        computed: {
            ...mapState({
                routerDirection: state => state.navigation.routerDirection,
                globalShowLive2D: state => state.app.showLive2D,
                globalShowMusicBox: state => state.app.showMusicBox,
            }),
            transition() {
                if (typeof window !== "undefined") {
                    if (!this.routerDirection) return 'slide-normal'
                    return `slide-${this.routerDirection}`
                }
            },
            currentPath () {
                let index = this.$route.matched.length-1
                return this.$route.matched[index].path
            },
            // 是否显示导航栏
            showNavigation () {
                return config.navigationBlackList.every(path => path !== this.currentPath) && 
                    (this.showPC || this.naviagtionPathList.some(path => this.currentPath.indexOf(path) >= 0))
            },
            // 是否显示板娘
            showLive2D () {
                return this.showPC && config.live2DBlackList.every(path => path !== this.currentPath) && this.globalShowLive2D
                // return this.globalShowLive2D
            },
            showMusicBox () {
                return this.showPC && config.musicBoxBlackList.every(path => path !== this.currentPath) && this.globalShowMusicBox
                // return this.globalShowMusicBox
            },
            // 是否显示底部
            showFooter () {
                return this.showPC && this.footerBlackList.every(path => path !== this.currentPath)
            },
            minHeight () {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.screen.height - 80 + 'px'
                }else{
                    return 'auto'
                }
            }
        },
        methods: {
            setShow () {
                let bol = this.screenSize === 'sm'
                this.showPC = !bol
            }
        }
    }
</script>
<style lang="less">
    #container {
        border-top: 1px solid transparent;
    }
    .router-view {
        width: 100%;
        min-height: 100%;
        .router-view-sm &{
            position: absolute;
            left: 0;
            top: 0;
            backface-visibility: hidden;
            transition: all .5s cubic-bezier(0.55, 0, 0.1, 1);
            &.slide-forward-enter,
            &.slide-back-leave-active {
                opacity: 0;
                transform: translate3d(100%, 0, 0);
            }
            &.slide-forward-leave-active,
            &.slide-back-enter {
                opacity: 0;
                transform: translate3d(-100%, 0, 0);
            }
        }
        .router-view-lg &{
            transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
            &.slide-forward-enter,
            &.slide-back-leave-active {
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
            }
            &.slide-forward-leave-active,
            &.slide-back-enter {
                opacity: 0;
                position: absolute;
                left: 0;
                top: 0;
            }
        }
    }
</style>
