<template>
    <div id="music" class="music-layout">
        <Sidebar id="music-sidebar" :tabs="tabs" v-if="sidebarShow"></Sidebar>
        <router-view class="music-view" id="music-container" v-if="show"></router-view>
        <MobileSidebar v-if="mobileSidebarShow" :tabs="tabs" :title="title"></MobileSidebar>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import MobileSidebar from 'components/Sidebar'
    import setShowMixin from '@/mixins/setShow'
    export default {
        name: 'Music',
        mixins: [setShowMixin],
        components: {
            Sidebar: resolve => require(['./sidebar/index'], resolve),
            MobileSidebar 
        },
        data () {
            return {
                show: false,
                sidebarShow: false,
                mobileSidebarShow: false,
                title: ''
            }
        },
        computed: {
            ...mapState({
                tabs: state => {
                    return state.music.musics.filter(item => item.name !== 'all')
                }
            }),
            classify () {
                return this.$route.params.classify
            }
        },
        async mounted() {
            this.$bus.$emit('onShowMsg', '原来你也爱听音乐啊~~')
            await this.$store.dispatch('getMusicTabs')
            this.show = true
            this.$nextTick(() => {
                this.init()
            })
        },
        methods: {
            init () {
                if (typeof window !== 'undefined') {
                    document.title = this.title = this.classify || '音乐列表'
                }
            },
            setShow () {
                const bol = this.screenSize === 'sm'
                this.sidebarShow = !bol
                this.mobileSidebarShow = bol
            }
        },
        watch: {
            $route (to) {
                if (to.path.indexOf('music') >= 0) {
                    this.init()
                }
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>