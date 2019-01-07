<template>
    <aside class="music-sidebar">
        <ul class="tags">
            <li class="df-c tag-item" :class="{active: item.name === classify}" v-for="(item, index) in tabs" :key="index">
                <Tooltip :msg="item.name" @click.native="$router._goBack(`/music/${item.name}`)">
                    <div class="tag df-c" :style="{backgroundColor: item.color}">
                        <IconSvg :name="item.icon || 'SliceCopy'"></IconSvg>
                    </div>
                </Tooltip>
            </li>
        </ul>
    </aside>
</template>
<script>
    import Tag from 'components/Tag'
    import Tooltip from 'components/Tooltip'
    import config from '@/config'
    export default {
        props: ['tabs'],
        components: {
            Tag,
            Tooltip
        },
        computed: {
            classify () {
                return this.$route.params.classify
            }
        }
    }
</script>

<style lang="less">
    .music-sidebar {
        position: fixed;
        height: 100%;
        .tags {
            margin-top: 40px;
        }
        .tag-item {
            margin: 20px 0;
            transition: transform .5s;
            &:hover {
                transform: scale(1.2);
            }
            .tag {
                width: 100%;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                svg {
                    display: inline-block;
                    margin: 5px 10px;
                    font-size: 40px;
                    color: #fff;
                }
            }
            &.active {
                .tag {
                    width: 95px;
                    height: 95px;
                }
                svg {
                    font-size: 60px;
                }
            }
        }
    }
</style>