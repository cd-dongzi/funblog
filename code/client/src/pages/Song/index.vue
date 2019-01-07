<template>
    <main>
        <Back class="song-back" :path="backPath"></Back>
        <div id="song">
            <div class="wrapper">
                <div class="cover bg-cover" :style="{backgroundImage: `url(${info.cover})`}">
                    <CircleLoading v-show="audioStatus === 'loading' || isLoading"></CircleLoading>
                    <div class="intro df-c">
                        <div class="box">
                            <h2 class="name">{{info.name}}</h2>
                            <time class="time">{{info.releaseTime | parseTime('{y}-{m}-{d}')}}</time>
                            <div class="current">{{currentTime | formatMusicTime}}</div>
                            <!-- 控制器 -->
                            <div class="controls">
                                <IconSvg name="dingbuzuoqiehuan" class="btn hover prev" @click.native="prev"></IconSvg>
                                <IconSvg name="zanting" class="btn hover pause" v-if="isPlaying" @click.native="pause"></IconSvg>
                                <IconSvg name="bofang" class="btn hover play" v-else @click.native="play"></IconSvg>
                                <IconSvg name="dingbuyouqiehuan" class="btn hover next" @click.native="next"></IconSvg>
                            </div>
                            <!-- 音量 -->
                            <VolumeBar></VolumeBar>
                        </div>
                    </div>
                    <ProgressBar></ProgressBar>
                </div>
                <div class="record df-c" :class="{begin: isBeginAnimate, hide: screenSize === 'sm'}" @animationend="animationEnd">
                    <div class="cd bg-cover" :style="{backgroundImage: `url(${require('assets/images/svg/record.svg')})`}"></div>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import CircleLoading from 'components/Loading/circleLoading'
    import Music from '@/api/music'
    import VolumeBar from './volumeBar'
    import ProgressBar from './progressBar'
    export default {
        name: 'Song',
        components: {
            CircleLoading,
            VolumeBar,
            ProgressBar
        },
        data() {
            return {
                isBeginAnimate: false,
                isLoading: false,
            }
        },
        computed: {
            ...mapState({
                musics: state => state.music.currentMusics,
                audioStatus: state => state.audio.status,
                audioSrc: state => state.audio.src,
                currentTime: state => state.audio.currentTime,
                info: state => {
                    return state.music ? state.music.currentMusic : {}
                },
                currentClassify: state => state.music.currentClassify
            }),
            isPlaying() {
                return this.audioStatus === 'playing'
            },
            screenSize() {
                if (typeof window !== "undefined") {
                    return this.$store.state.system.screenSize
                }
                return ''
            },
            backPath () {
                return this.currentClassify ? `/music/${this.currentClassify}` : '/music'
            }
        },
        asyncData({ route, store }) {
            if (store.state.music.currentMusic._id !== route.params.id) {
                return store.dispatch('getMusicInfo', { id: route.params.id })
            }
        },
        mounted() {
            this.$bus.$emit('onShowMsg', `您正在欣赏<a href="${this.info.github||'javascript:;'}" target="_blank">${this.info.name}</a>这首歌曲~~`)
            this.play()
        },
        watch: {
            $route(to, from) {
                this.play()
            },
            info: {
                immediate: true,
                handler () {
                    this.$nextTick(() => {
                        if (typeof window !== "undefined") {
                            document.title = this.info.name || '没找到歌曲呢！'
                        }
                    })
                }
            }
        },
        methods: {
            play() {
                if (this.audioSrc !== this.info.url) {
                    this.$store.commit('SET_AUDIO_SRC', {
                        src: this.info.url
                    })
                }
                this.isBeginAnimate = true
                this.$store.dispatch('playAudio')
            },
            pause() {
                this.$store.dispatch('pauseAudio')
            },
            async prev() {
                this.isBeginAnimate = false
                let index = this.musics.findIndex(item => item._id === this.info._id),
                    len = this.musics.length,
                    obj = null
                if (index < 0) {
                    obj = await this.getRandomMusicInfo()
                }else{
                    await this.placeholderTime()
                    index --
                    if (index < 0) {
                        index = len - 1
                    }
                    obj = this.musics[index]
                    this.$store.commit('SET_CURRENT_MUSIC', this.musics[index])
                }
                this.$router._skip(`/song/${obj._id}`)
            },
            async next() {
                this.isBeginAnimate = false
                let index = this.musics.findIndex(item => item._id === this.info._id),
                    len = this.musics.length,
                    obj = null
                if (index < 0) {
                    obj = await this.getRandomMusicInfo()
                }else{
                    await this.placeholderTime()
                    index ++
                    if (index >= len) {
                        index = 0
                    }
                    obj = this.musics[index]
                    this.$store.commit('SET_CURRENT_MUSIC', obj)
                }
                this.$router._skip(`/song/${obj._id}`)
            },
            placeholderTime () {
                this.isLoading = true
                return new Promise(r => {
                    setTimeout(() => {
                        this.isLoading = false
                        r()
                    })
                })
            },
            // async next() {
            //     let index = this.musics.findIndex(item => item._id === this.info._id),
            //         len = this.musics.length
            //     if (index < 0) {
            //         await this.getRandomMusicInfo()
            //     }else{
            //         index ++
            //         if (index >= len) {
            //             index = 0
            //         }
            //         this.$store.commit('SET_CURRENT_MUSIC', this.musics[index])
            //     }
            //     this.play()
            // },
            getRandomMusicInfo () {
                return new Promise(async (resolve, reject) => {
                    this.isLoading = true
                    let obj = await this.$store.dispatch('getRandomMusicInfo')
                    this.isLoading = false
                    resolve(obj)
                })
            },
            animationEnd () {
                this.$bus.$emit('songAnimationEnd')   
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>