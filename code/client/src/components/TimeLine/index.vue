<template>
    <div :is="template" :list="list"></div>
</template>
<script>
    import setShowMixin from '@/mixins/setShow'
    export default {
        mixins: [setShowMixin],
        props: {
            list: {
                type: Array
            }
        },
        components: {
            PcTimeLine: resolve => require(['./pc'], resolve),
            MobileTimeLine: resolve => require(['./mobile'], resolve),
        },
        data () {
            return {
                template: 'div'
            }
        },
        methods: {
            setShow () {
                let bol = this.screenSize === 'sm'
                this.template = bol ? 'MobileTimeLine' : 'PcTimeLine'
            }
        }
    }
</script>