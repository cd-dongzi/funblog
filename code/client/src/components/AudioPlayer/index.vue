<template>
    <audio ref="audio"></audio>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState({
                audio: state => state.audio.audio,
                audioSrc: state => state.audio.src,
                currentTime: state => state.audio.currentTime,
                currentMusic: state => state.music.currentMusic
            })
        },
        watch: {
            currentMusic () {
                if (this.currentMusic.url !== this.audioSrc) {
                    this.$store.commit('SET_AUDIO_SRC', {
                        src: this.currentMusic.url
                    })
                    this.$store.commit('SET_AUDIO_STATUS', {
                        status: 'none'
                    })
                }
            }
        },
        mounted() {
            this.$store.commit('SET_AUDIO', {
                audio: this.$refs.audio
            })
            // 结束
            this.audio.addEventListener('ended', this.ended)
            // 开始播放时触发
            this.audio.addEventListener('play', this.play)
            // 可以播放
            this.audio.addEventListener('canplay', this.canplay)
            // 暂停
            this.audio.addEventListener('pause', this.pause)
            // 播放时间改变
            this.audio.addEventListener('timeupdate', this.timeupdate)
            // 音量改变
            this.audio.addEventListener('volumechange', this.volumechange)
        },
        methods: {
            play () {
                // console.log('play')
            },
            canplay () { 
                this.$store.commit('SET_AUDIO_DURATION', { duration: Math.ceil(this.audio.duration) })
                this.$store.commit('SET_AUDIO_VOLUME', { volume: this.audio.volume })
            },
            pause () {
                // console.log('pause')
            },
            async ended () {
                this.$store.commit('SET_AUDIO_STATUS', {
                    status: 'ended'
                })
                // 重新随机获取
                await this.$store.dispatch('getRandomMusicInfo')
                if (this.audioSrc !== this.currentMusic.url) {
                    this.$store.commit('SET_AUDIO_SRC', {
                        src: this.currentMusic.url
                    })
                }
                this.$store.dispatch('playAudio')
            },
            timeupdate () {
                const currentTime = Math.ceil(this.audio.currentTime)
                if (this.currentTime === currentTime) {
                    return
                }
                this.$store.commit('SET_AUDIO_CURRENTTIME', { currentTime })
            },
            volumechange () {
                // console.log(this.audio.volume)
            }
        }
    }
</script>