<template>
    <div>
        <div class="slide-nav df-sb">
            <Navigation></Navigation>
            <span class="slide-text">{{title}}</span>
            <IconSvg name="menu" class="sidebar-icon" :class="{hide: show}" @click.native="toggle"></IconSvg>
        </div>
        <SideBar :show.sync="show" :tabs="tabs"></SideBar>
    </div>
</template>
<script>
    import Navigation from 'components/Navigation'
    export default {
        props: {
            tabs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        components: {
            SideBar: resolve => require(['./sidebar'], resolve),
            Navigation
        },
        data() {
            return {
                show: false
            }
        },
        methods: {
            toggle() {
                this.show = !this.show
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>