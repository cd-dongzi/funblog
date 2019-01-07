<template>
    <transition name="slidebar">
        <GlobalMask :show="show" v-if="show" @click.native="$emit('update:show', false)">
            <div id="sidebar" class="sidebar" @click.stop="">
                <div class="tags">
                    <div class="tags-title border-1px-b">Tags</div>
                    <ul>
                        <li v-for="(item, index) in tabs" :key="index">
                            <Tag class="tag" :msg="item.name" :path="item.path" :color="item.color" @click.native="$emit('update:show', false)"></Tag>
                        </li>
                    </ul>
                </div>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
    import Tag from 'components/Tag'
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            tabs: Array
        },
        components: {
            Tag
        }
    }
</script>
<style lang="less">

/* 切换效果 */
.slidebar-enter, .slidebar-leave-active {
    opacity: 0;
    #sidebar {
        transform: translateX(100%);
    }
}
.slidebar-enter-active {
    transition: opacity .5s;
    #sidebar {
        transition: transform .5s;
    }
}
.slidebar-leave-active {
    transition: opacity .3s;
    #sidebar {
        transition: transform .3s;
    }
}
</style>
