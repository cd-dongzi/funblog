<template>
	<canvas class="raindrop-canvas" @click="close"></canvas>
</template>
<script>
	import rainCanvas from './main.js'
	export default {
		data () {
			return{
				c: null,
				w: 0,
				h: 0,
			}
		},
		mounted () {
			rainCanvas(document.querySelector('.raindrop-canvas'))
        },
        methods: {
            close () {
                this.$emit('close')
            }
        }
	}
</script>
<style lang="less">
	.raindrop-canvas {
		position: fixed;
		width: 100%;height: 100%;
        left:0;top:0;
        z-index: 999;
        opacity: .7;
	}
</style>