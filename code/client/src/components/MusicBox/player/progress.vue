<template>
    <div class="music-box-progress">
        <div class="bar" :style="{width: currentTime/duration*100+'%'}"></div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    export default {
        computed: {
            ...mapState({
                duration: state => state.audio.duration,
                currentTime: state => state.audio.currentTime
            })
        }
    }
</script>
<style lang="less">
    .music-box-progress {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: @vice-color;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 10;

        .bar {
            width: 0%;
            height: 100%;
            border-radius: 2px;
            background: @theme-color;
        }
    }
</style>