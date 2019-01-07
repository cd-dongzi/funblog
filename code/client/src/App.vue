<template>
    <div id="container">
        <router-view v-if="isRouterAlive" :class="[isPC ? 'router-view-pc' : 'router-view-mobile', `router-view-${screenSize}`]"></router-view>
    </div>
</template>
<script>
    import Visitor from '@/api/visitor'
    import config from '@/config'
    import {
        isPC
    } from '@/utils/type'
    export default {
        data() {
            return {
                isRouterAlive: true
            }
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        computed: {
            isPC() {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.isPC
                    // return true
                }
                return true
            },
            screenSize() {
                if (typeof window !== 'undefined') {
                    return this.$store.state.system.screenSize
                }
                return ''
            }
        },
        mounted() {
            this.addVisitor()
            // import('Vconsole').then(res => {
            //     new res()
            // })
        },
        methods: {
            reload() {
                this.isRouterAlive = false
                this.$nextTick(() => (this.isRouterAlive = true))
            },
            // 添加游客信息
            addVisitor() {
                // if (!isPC()) {
                //     if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
                //         let version = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/); // ["OS 10_3_2", "10", "3", "1"] 
                //         console.log('ios')
                //         console.log(version)
                //     }else if (/(Android)/i.test(navigator.userAgent)){ //安卓机
                //         let version = navigator.userAgent.match(/Android (\d+)\.(\d+)\.?(\d+)?/); //  ["Android 5.0.2","5","0","2"]
                //         console.log('android')
                //         console.log(version)
                //     }
                // }
                import ('@/utils/storage').then(async ({
                    Local
                }) => {
                    const key = config.keys.visitorKey
                    if (Local.get(key)) return
                    const res = await Visitor.addVisitor()
                    Local.set(key, 1)
                })
            }
        }
    }
</script>