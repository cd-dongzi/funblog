<template>
    <div class="barrage-layout">
        <div class="barrage-box bg-cover" :style="{backgroundImage: `url(${require('assets/images/background/blog.jpg')})`}">
        <!-- <div class="barrage-box bg-cover"> -->
            
            <CanvasBarrage :data="list"></CanvasBarrage>
        </div>
        <Send></Send>
    </div>
</template>
<script>
    import Send from './send'
    export default {
        components: {
            Send,
            CanvasBarrage: resolve => require(['./canvasBarrage'], resolve)
        },
        data () {
            return {
                list: []
            }
        }
    }
</script>
<style lang="less">
    .barrage-box {
        width: 100%;
        height: 4rem;
        max-height: 500px;
        position: relative;
        text-align: center;
        overflow: hidden;
    }
</style>