<template>
    <div id="rainyday-bg" class="bg-cover" :style="{backgroundImage: `url(${options.image})`}">
    <!-- <div id="rainyday-bg" class="bg-cover" :style="{backgroundImage: `url(${options.image})`}"> -->
        <slot></slot>
        <!-- <img id="background" alt="background" src=""/> -->
        <!-- <p id="background" class="bg-cover" :style="{backgroundImage: `url(${require('assets/images/background/blog.jpg')})`}"></p> -->
        <!-- <img id="background" alt="background" src="" @click="" /> -->
    </div>
</template>
<script>
    export default {
        props: {
            options: Object
        },
        data () {
            return {
                rainyDay: null,
                toggleBol: true
            }
        },
        async mounted() {
            this.run()
        },
        methods: {
            toggle () {
                if (this.toggleBol) {
                    this.rainyDay.pause()
                }else{
                    this.rainyDay.resume()
                }
                this.toggleBol = !this.toggleBol
            },
            /* 
                image：模拟玻璃窗的图片元素，必须填写。 
                parentElement：canvas的父元素，如果不提供则默认为body。 
                crop：如果只使用图像的某一部分，用此参数提供坐标。如果不提供则默认为整幅图片。 
                blur：定义模糊的下雨雨滴效果。如果不提供值，默认为10。设置为0表示无模糊效果。 
                opacity：定义雨滴的透明度。如果不提供默认为1。 

                rainyDay.rain（[
                    [3 //最小液滴尺寸，3 //最大液滴尺寸，0.88 //延迟]，
                    [5,5,7.0]，
                    [6,2,1]]）

                rainyDay.pause()
                rainyDay.resume()
                rainyDay.destroy()
            */
            async run() {
                const RainyDay = (await import ('./rainyday')).default
                this.rainyDay = new RainyDay({
                    image: 'rainyday-bg'
                })
                this.rainyDay.rain([
                    [0, 1, .9]
                ], 1000)
            },
        }
    }
</script>
<style lang="less">
    #background {
        width: 100%;
        height: 400px;
        display: block;
        object-fit: cover;
        // margin-top: 100px;
    }
</style>