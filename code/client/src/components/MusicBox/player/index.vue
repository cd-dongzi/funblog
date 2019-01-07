<template>
    <div class="music-box-player cf" :class="{hide: isClose}">
        <div class="music-box-cover">
            <div class="cover bg-cover" :style="{backgroundImage: `url(${info.cover})`}" @click="toggle"></div>
        </div>
        <div class="music-box-main fl">
            <div class="intro df-col-sb">
                <IconSvg class="close" name="close" @click.native="close"></IconSvg>
                <h3 class="name wes">{{info.name}}</h3>
                <div class="controls">
                    <IconSvg class="icon" name="dingbuzuoqiehuan" @click.native="prev"></IconSvg>
                    <IconSvg class="icon" name="zanting" v-if="isPlaying" @click.native="pause"></IconSvg>
                    <IconSvg class="icon" name="bofang" v-else @click.native="play"></IconSvg>
                    <IconSvg class="icon" name="dingbuyouqiehuan" @click.native="next"></IconSvg>
                    <IconSvg class="icon" name="chakangengduo" @click.native="more"></IconSvg>
                </div>
            </div>
        </div>
        <Progress></Progress>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import Progress from './progress'
    export default {
        components: {
            Progress
        },
        data() {
            return {
                isClose: false
            }
        },
        computed: {
            ...mapState({
                audioSrc: state => state.audio.src,
                randomMusics: state => state.music.randomMusics,
                info: state => {
                    return state.music ? state.music.currentMusic : {}
                }
            }),
            isPlaying() {
                return this.$store.state.audio.status === 'playing'
            }
        },
        mounted () {
            this.$bus.$on('musicBoxPlay', () => {
                this.play()
            })
        },
        methods: {
            play() {
                if (this.audioSrc !== this.info.url) {
                    this.$store.commit('SET_AUDIO_SRC', {
                        src: this.info.url
                    })
                }
                this.$store.dispatch('playAudio')
            },
            pause() {
                this.$store.dispatch('pauseAudio')
            },
            prev() {
                let index = this.randomMusics.findIndex(item => item._id === this.info._id),
                    len = this.randomMusics.length
                if (index >= 0) {
                    index --
                    if (index < 0) {
                        index = len - 1
                    }
                }else {
                    index = this.randNumber(0, len)
                }
                this.$store.commit('SET_CURRENT_MUSIC', this.randomMusics[index])
                this.play()
            },
            next() {
                let index = this.randomMusics.findIndex(item => item._id === this.info._id),
                    len = this.randomMusics.length
                if (index >= 0) {
                    index ++
                    if (index >= len) {
                        index = 0
                    }
                }else {
                    index = this.randNumber(0, len)
                }
                this.$store.commit('SET_CURRENT_MUSIC', this.randomMusics[index])
                this.play()
            },
            more() {
                this.$emit('more')
            },
            close() {
                this.isClose = true
                this.$emit('close')
            },
            toggle() {
                if (this.isClose) {
                    this.isClose = false
                }else{
                    this.$router._skip(`/song/${this.info._id}`)
                }
            },
            randNumber (min, max) {
                return min + Math.floor(Math.random() * (max - min))
            }
        }
    }
</script>
<style lang="less">
    .music-box-player {
        @cover: 80px;
        @main: 180px;
        @w: @cover + @main;
        width: @w;
        position: relative;
        z-index: 10;
        overflow: hidden;
        box-shadow: 0 15px 30px 0 rgba(0, 0, 0, .15);
        transition: width .2s linear;
        &.hide {
            width: @cover;
            .cover {
                opacity: 0.5;
            }
            .music-box-main {
                @transW: @w - @cover;
                transform: translateX(-@transW);
            }
        }
        .music-box-cover {
            width: @cover;
            height: @cover;
            position: absolute;
            z-index: 3;
            box-shadow: 1px 3px 10px rgba(0, 0, 0, 0.3);
            background-color: #fff;
        }
        .cover {
            width: @cover;
            height: @cover;
            transition: opacity .3s;
        }
        .music-box-main {
            width: @main;
            height: @cover;
            margin-left: @cover;
            transition: transform .2s linear;
            position: relative;
            z-index: 1;
        }
        .intro {
            width: @main;
            height: 100%;
            align-items: flex-start;
            padding: 15px 0 15px 20px;
            position: relative;
            background-color: rgba(255, 255, 255, 0.7);
        }
        .close {
            position: absolute;
            right: 0px;
            top: 0px;
            color: @vice-color;
            font-size: 30px;
            &:hover {
                color: @theme-color;
            }
        }
        .name {
            width: 80%;
            font-size: 13px;
            font-weight: 600;
            color: @vice-color;
        }
        .controls {
            .icon {
                font-size: 20px;
                color: @vice-color;
                margin: 0 10px;
                &:first-child {
                    margin-left: 0;
                }
                &:last-child {
                    margin-right: 0;
                }
                &:hover {
                    color: @theme-color;
                }
            }
        }
    }
</style>