<template>
    <div>
        <pcBackTop v-if="pcShow"></pcBackTop>
        <mobileBackTop v-if="mobileShow"></mobileBackTop>
    </div>
</template>
<script>
    import setShowMixin from '@/mixins/setShow'
    export default {
        mixins: [setShowMixin],
        components: {
            pcBackTop: resolve => require(['./pc'], resolve),
            mobileBackTop: resolve => require(['./mobile'], resolve)
        },
        data () {
            return {
                pcShow: false,
                mobileShow: false,
            }
        },
        methods: {
            setShow () {
                const bol = this.screenSize === 'sm'
                this.pcShow = !bol
                this.mobileShow = bol
            }
        }
    }
</script>
<style lang="less">
</style>