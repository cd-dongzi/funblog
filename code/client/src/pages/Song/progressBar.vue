<template>
    <div class="music-progress" @click="setTimeProgress" ref="wrapper">
        <div class="progress-bar" :style="{width: currentTime/duration*100+'%'}"></div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        data () {
            return {
                rect: null  
            }
        },
        computed: {
            ...mapState({
                duration: state => state.audio.duration,
                currentTime: state => state.audio.currentTime
            })
        },
        mounted () {
            this.rect = this.$refs.wrapper.getBoundingClientRect()
        },
        methods: {
            setTimeProgress (e) {
                const target = e.currentTarget
                let time = Math.floor(e.offsetX/target.clientWidth*this.duration)
                this.setTime(time)
            },
            setTime (time) {
                this.$store.commit('SET_PROGRESS', {
                    currentTime: time
                })
            }
        }
    }
</script>
<style lang="less">
    .music-progress {
        width: 100%;
        height: 4px;
        background: @vice-color;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9;
        .progress-bar {
            width: 0%;
            height: 100%;
            background: @theme-color;
        }
    }
</style>