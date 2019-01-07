<template>
    <div id="blog" class="blog-layout">
        <Sidebar id="blog-sidebar" :tabs="tabs" v-if="sidebarShow"></Sidebar>
        <router-view class="blog-view" id="blog-container" v-if="show"></router-view>
        <MobileSidebar v-if="mobileSidebarShow" :tabs="tabs" :title="title"></MobileSidebar>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    import setShowMixin from '@/mixins/setShow'
    import MobileSidebar from 'components/Sidebar'
    export default {
        name: 'Blog',
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
                    return state.blog.blogs.filter(item => item.name !== 'all')
                }
            }),
            classify () {
                return this.$route.params.classify
            }
        },
        async mounted() {
            this.$bus.$emit('onShowMsg', '好好学习，天天向上~~~')
            await this.$store.dispatch('getBlogTabs')
            this.show = true
            this.$nextTick(() => {
                this.init()
            })
        },
        methods: {
            init () {
                if (typeof window !== 'undefined') {
                    document.title = this.title = this.classify || '博客列表'
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
                if (to.path.indexOf('blog') >= 0) {
                    this.init()
                }
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>