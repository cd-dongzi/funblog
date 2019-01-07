<template>
    <canvas id="canvas-barrage"></canvas>
</template>
<script>
import CanvasBarrage from './barrage'
import Barrage from '@/api/barrage'
export default {
    data () {
        return {
            data: []
        }
    },
    async mounted () {
        this.data = await this.getBarrages({pagesize: 20})
        this.initBarrage()
    },
    methods: {
        initBarrage () {
            const barrage = new CanvasBarrage({
                selector: '#canvas-barrage', 
                data: this.data.map(item => {
                    item.text = item.msg
                    return item
                }),
                space: 3,
                endCallback: async () => {
                    let data = await this.getBarrages({pagesize: 20})
                    if (data.length > 0) {
                        barrage.add({
                            type: 'reset',
                            data
                        })
                    }
                }
            })
            barrage.init()
            this.$bus.$on('addBarrage', barrage.add.bind(barrage)) 
            this.$bus.$on('pauseBarrage', barrage.pause.bind(barrage)) 
            this.$bus.$on('playBarrage', barrage.play.bind(barrage)) 
        },
        getBarrages (params) {
            return new Promise(async (resolve) => {
                const res = await Barrage.getBarrages(params)
                resolve(res.data)
            })
        }
    }
}
</script>
<style lang="less">
    #canvas-barrage {
        width: 100%;
        height: 100%;
    }
</style>