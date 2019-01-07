<template>
    <div id="me" class="me-layout" :class="[`${screenSize}-me-layout`]">
        <Github path="https://github.com/cd-dongzi" id="my-github"></Github>
        <MobileNav v-if="showMobileNav"></MobileNav>
        <MobileMain v-if="showMobileNav"></MobileMain>
        <PCNav v-if="showPCNav"></PCNav>
        <PCMain v-if="showPCNav"></PCMain>
    </div>
</template>
<script>
import setShowMixin from '@/mixins/setShow'
import Github from 'components/Github'
export default {
    name: 'Me',
    mixins: [setShowMixin],
    components: {
        Github,
        MobileNav: resolve => require(['./mobile/nav'], resolve),
        MobileMain: resolve => require(['./mobile/main'], resolve),
        PCNav: resolve => require(['./pc/nav'], resolve),
        PCMain: resolve => require(['./pc/main'], resolve)
    },
    data () {
        return {
            showMobileNav: false,
            showPCNav: false
        }
    },
    computed: {
        screenSize() {
            if (typeof window !== "undefined") {
                return this.$store.state.system.screenSize
            }
            return ''
        },
        height () {
            if (typeof window !== 'undefined') {
                if (this.$store.state.system.isPC) {
                    return this.$store.state.system.screen.height + 'px'
                }else{
                    return 'auto'
                }
            }else{
                return 'auto'
            }
        }
    },
    methods: {
        setShow () {
            const bol = this.screenSize === 'sm'
            this.showMobileNav = bol
            this.showPCNav = !bol
        }
    }
}
</script>
<style lang="less">
#my-github {
    position: fixed;
    right: 0;top: 0;
    z-index: 10;
}
.lg-me-layout {
    #my-github{
        left: 220px;
    }
}
</style>