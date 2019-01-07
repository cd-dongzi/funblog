<template>
    <div class="volume df-c">
        <IconSvg name="jingyin" class="min-volume hover" @click.native="setVolume(0)"></IconSvg>
        <div class="volume-progress df-c" ref="volume" @click="setProgressVolume($event)">
            <div class="volume-slide">
                <div class="volume-bar" :style="{width: `${volume*100}%`}">
                    <i class="drag-volume-icon bg-cover-all hover" 
                        :style="{backgroundImage: `url(${require('assets/images/svg/volume.svg')})`}"
                        @click.stop=""
                        @touchstart.stop="start($event)" 
                        @touchmove.stop="move($event)"
                        @touchend.stop="end($event)"
                        @mousedown.stop="start($event)">
                    </i>
                </div>
            </div>
        </div>
        <IconSvg name="shengyin" class="max-volume hover" @click.native="setVolume(1)"></IconSvg>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data () {
            return {
                isStart: false,
                volumeWidth: 0,
                startX: 0,
                distance: 0,
                volumeRect: null,
                dragerRect: null
            }
        },
        computed: {
            ...mapState({
                volume: state => state.audio.volume
            }),
            isPC() {
                if (typeof window !== "undefined") {
                    return this.$store.state.system.isPC
                }
                return true
            },
            screenSize() {
                if (typeof window !== "undefined") {
                    return this.$store.state.system.screenSize
                }
                return ''
            }
        },
        mounted () {
            this.volumeWidth = this.$refs.volume.clientWidth
            if (this.screenSize === 'sm') {
                this.volumeRect = this.$refs.volume.getBoundingClientRect()
            }else{
                this.$bus.$on('songAnimationEnd', () => {
                    this.volumeRect = this.$refs.volume && this.$refs.volume.getBoundingClientRect()
                })
            }
        },
        methods: {
            start (e) {
                this.isStart = true
                this.startX = this.getClientX(e)
                this.dragerRect = e.target.getBoundingClientRect()
                this.distance = this.dragerRect.left - this.volumeRect.left
                if (this.isPC) {
                    document.addEventListener('mousemove', this.move)
                    document.addEventListener('mouseup', this.end)
                }
            },
            move (e) {
                if (!this.isStart) return
                const currentX = this.getClientX(e)
                let distance = currentX - this.startX + this.distance
                distance = distance < 0 ? 0 : distance
                distance = distance > this.volumeWidth ? this.volumeWidth : distance
                this.setVolume(distance/this.volumeWidth)
            },
            end (e) {
                this.isStart = false
            },
            getClientX (e) {
                if (this.isPC) {
                    return e.clientX
                }else{
                    return e.touches[0].clientX
                }
            },
            setProgressVolume (e) {
                const target = e.currentTarget
                if (Object.is(target, e.target)) {
                    this.setVolume(e.offsetX/target.clientWidth)
                }
            },
            setVolume (volume) {
                this.$store.commit('SET_AUDIO_VOLUME', {volume})
            }
        }
    }
</script>