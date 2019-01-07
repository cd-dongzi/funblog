<template>
    <div id="message" class="message-layout">
        <Barrage v-if="showBarrage"></Barrage>
        <Wall v-if="showWall"></Wall>
    </div>
</template>
<script>
import setShowMixin from '@/mixins/setShow'
export default {
    name: 'Message',
    mixins: [setShowMixin],
    components: {
        Wall: resolve => require(['./wall'], resolve),
        Barrage: resolve => require(['./barrage'], resolve)
    },
    data () {
        return {
            showBarrage: false,
            showWall: false
        }
    },
    mounted () {
        document.getElementById('message').scrollIntoView({
            block: 'start',
            behavior: 'smooth' 
        })
    },
    methods: {
        setShow () {
            const bol = this.screenSize === 'sm'
            this.showBarrage = bol
            this.showWall = !bol
            if (bol) {
                this.$bus.$emit('playBarrage')
            }else{
                this.$bus.$emit('pauseBarrage')
            }
        }
    }
}
</script>
<style lang="less">

</style>