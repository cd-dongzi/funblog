<template>
    <div id="music-box" class="music-box" ref="musicBox" @mousedown.stop="start($event)">
        <CircleLoading v-show="showLoading"></CircleLoading>
        <Player @more="more" @close="showList=false"></Player>
        <List v-show="showList"></List>
    </div>
</template>
<script>
    import CircleLoading from 'components/Loading/circleLoading'
    import Player from './player'
    import List from './list'
    import Music from '@/api/music'
    import config from '@/config'
    export default {
        components: {
            CircleLoading,
            Player,
            List
        },
        data() {
            return {
                showList: false,
                musicBoxObj: {
                    isDrag: false,
                    distanceX: 0,
                    distanceY: 0
                }
            }
        },
        computed: {
            musicBox() {
                return this.$refs.musicBox
            },
            screen() {
                if (typeof window !== "undefined") {
                    return this.$store.state.system.screen
                }
            },
            showLoading() {
                return this.$store.state.audio.status === 'loading'
            },
            globalShowMusicBox() {
                return this.$store.state.app.showMusicBox
            },
            currentPath() {
                let index = this.$route.matched.length - 1
                return this.$route.matched[index].path
            },
            currentMusic() {
                return this.$store.state.music.currentMusic
            }
        },
        mounted() {
            this.getRandomMusicInfo()
        },
        // watch: {
        //     $route(to, from) {
        //         // this.getRandomMusicInfo()
        //     }
        // },
        methods: {
            start(e) {
                this.musicBoxObj.isDrag = true
                this.musicBoxObj.distanceX = e.clientX - this.musicBox.offsetLeft
                this.musicBoxObj.distanceY = e.clientY - this.musicBox.offsetTop
                document.addEventListener('mousemove', this.move)
                document.addEventListener('mouseup', this.end)
            },
            move(e) {
                if (!this.musicBoxObj.isDrag) return
                let {
                    l,
                    t
                } = this.movingRange(e.clientX - this.musicBoxObj.distanceX, e.clientY - this.musicBoxObj.distanceY)
                this.musicBox.style.left = l + 'px'
                this.musicBox.style.top = t + 'px'
            },
            end() {
                this.musicBoxObj.isDrag = false
                document.addEventListener('mousemove', null)
                document.addEventListener('mouseup', null)
            },
            movingRange(l, t) {
                let minL = 10,
                    maxL = this.screen.width - this.musicBox.offsetWidth - 10,
                    minT = 10,
                    maxT = this.screen.height - this.musicBox.offsetHeight - 10
                if (l < minL) l = minL
                if (l > maxL) l = maxL
                if (t < minT) t = minT
                if (t > maxT) t = maxT
                return {
                    l,
                    t
                }
            },
            more() {
                this.showList = !this.showList
            },
            getRandomMusicInfo() {
                if (!this.currentMusic.url && this.globalShowMusicBox) {
                    this.$store.dispatch('getRandomMusicInfo')
                }
            }
        }
    }
</script>
<style lang="less">
    .music-box {
        user-select:none;
        position: fixed;
        width: 260px;
        height: 80px;
        left: 10px;
        bottom: 10px;
        // margin-top: 12px;
        z-index: 98;
        box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);
    }
</style>