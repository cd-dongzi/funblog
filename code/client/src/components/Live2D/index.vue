<template>
    <section id="live2d-box" ref="live2d" @mousedown.stop="start($event)">
        <MessageBox :show.sync="showMsg"></MessageBox>
        <Tools 
            :show.sync="showTools"
            :showChatBox.sync="showChatBox"
            @switchRole="switchRole"
            @dressUp="dressUp">
        </Tools>
        <canvas id="live2d" :width="280" :height="250" @mouseover="mouseover" @mouseout="mouseout"></canvas>
        <div class="live2d-loading" v-show="modelLoading">
            <CircleLoading></CircleLoading>
        </div>
        <ChatBox :show.sync="showChatBox"></ChatBox>
    </section>
</template>
<script>
import { randNumber } from '@/utils/number'
import config from '@/config'
import CircleLoading from 'components/Loading/circleLoading'
import ChatBox from './chatBox'
import MessageBox from './messageBox'
import Tools from './tools'
import Live2d from '@/api/live2d'
export default {
    name: 'Live2d',
    components: {
        CircleLoading,
        ChatBox,
        MessageBox,
        Tools
    },
    data () {
        return {
            Local: null,
            showMsg: false, // 显示信息框
            showTools: false, // 显示工具栏
            showChatBox: false, // 显示聊天框
            modelId: 0,
            texturesId: 0,
            modelLoading: false,

            live2dObj: {
                isDrag: false,
                distanceX: 0,
                distanceY: 0
            }
        }
    },
    computed: {
        live2d () {
            return this.$refs.live2d
        },
        screen() {
            if (typeof window !== "undefined") {
                return this.$store.state.system.screen
            }
        }
    },
    async mounted () {
        try {
            await import('assets/live2D/live2d.js')
            this.initModel()
        }catch(err) {
            console.log('live2d加载失败!!!')
        }
    },
    methods: {
        start (e) {
            this.live2dObj.isDrag = true
            this.live2dObj.distanceX = e.clientX - this.live2d.offsetLeft
            this.live2dObj.distanceY = e.clientY - this.live2d.offsetTop
            document.addEventListener('mousemove', this.move)
            document.addEventListener('mouseup', this.end)
        },
        move (e) {
            if (!this.live2dObj.isDrag) return
            let {l, t} = this.movingRange(e.clientX - this.live2dObj.distanceX, e.clientY - this.live2dObj.distanceY )
            this.live2d.style.left = l + 'px'
            this.live2d.style.top = t + 'px'
        },
        end () {
            this.live2dObj.isDrag = false
            document.addEventListener('mousemove', null)
            document.addEventListener('mouseup', null)
        },
        movingRange (l, t) {
            let minL = 0,
                maxL = this.screen.width - this.live2d.offsetWidth,
                minT = 0,
                maxT = this.screen.height - this.live2d.offsetHeight
            if (l < minL) l = minL
            if (l > maxL) l = maxL
            if (t < minT) t = minT
            if (t > maxT) t = maxT
            return {l, t}
        },

        // 更换模型
        changeModel () {
            return new Promise(async resolve => {
                const res = await Live2d.changeModel({
                    modelId: this.modelId
                })
                const data = res.data
                this.modelId = data.modelId
                this.texturesId = data.texturesId
                resolve()
            })
        },
        // 更换服装
        changeTextures () {
            return new Promise(async resolve => {
                const res = await Live2d.changeTextures({
                    modelId: this.modelId,
                    texturesId: this.texturesId
                })
                const data = res.data
                resolve(data)
            })
        },
        async initModel () {
            return new Promise(async resolve => {
                const {Local} = await import('@/utils/storage')
                this.Local = Local
                let ids = Local.get(config.keys.live2DKey)
                if (typeof ids === 'string') {
                    let arr = ids.split(',')
                    if (!this.isIntNum(arr[0])) {
                        await this.changeModel()
                    }else{
                        this.modelId = arr[0]
                    }
                    if (!this.isIntNum(arr[1])) {
                        await this.changeTextures()
                    }else{
                        this.texturesId = arr[1]
                    }
                }else{
                    // this.modelId = 5
                    // this.texturesId = 0
                    await this.changeModel()
                }
                this.loadModel()
                resolve()
            })
        },
        // 重新load模型
        loadModel () {
            this.modelLoading = true
            // this.getModelJson()
            const url = `${config.app.baseUrl}/live2d/model/${this.modelId}/textures/${this.texturesId}`
            loadlive2d("live2d", url, this.loadingFinish())
        },
        loadingFinish () {
            console.log('live2d',`模型${this.modelId}-${this.texturesId}加载完成`)
            this.modelLoading = false
            this.Local.set(config.keys.live2DKey, `${this.modelId},${this.texturesId}`)
        },
        // getModelJson () {
        //     return new Promise(async resolve => {
        //         const res = await Live2d.loadLive2d(this.modelId, this.texturesId)
        //         console.log(res)
        //         const arr = []
        //         for (const key in res) {
        //             const val = res[key]
        //             if ((typeof val === 'string' && val.indexOf('json') >= 0) || key === 'model') {
        //                 arr.push(val)
        //             }
        //             if (key === 'textures') {
        //                 val.forEach(item => {
        //                     arr.push(item)
        //                 })
        //             }
        //             if (key === 'expressions') {
        //                 val.forEach(item => {
        //                     arr.push(item)
        //                 })
        //             }
        //             if (key === 'motions') {
        //                 motions(val, arr)
        //             }
        //         }
        //         console.log(arr)
        //         function motions (obj) {
        //             for (const key in obj) {
        //                 obj[key].forEach(item => {
        //                     arr.push(item.file)
        //                 })
        //             }
        //         }
        //     })
        // },
        async switchRole () {
            await this.changeModel()
            this.loadModel()
        },
        async dressUp () {
            const {texturesId} = await this.changeTextures()
            if (texturesId !== this.texturesId) {
                this.texturesId = texturesId
                this.loadModel()
                this.$bus.$emit('onShowMsg', '我的新衣服好看嘛')
            }else{
                this.$bus.$emit('onShowMsg', '我还没有其他衣服呢!')
            }
        },
        mouseover () {
            this.showTools = true
        },
        mouseout () {
            this.showTools = false
        },
        isIntNum(val){
            let re = /^[0-9]+$/
            return re.test(val)
        }
    }
}
</script>

<style lang="less">
    @import './style.less';
</style>

