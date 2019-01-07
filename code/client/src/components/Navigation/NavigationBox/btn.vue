<template>
    <li class="navigation-btn">
        <slot></slot>
        <!-- <div class="navigation-btn-o">
            <Link class="navigation-btn-a df-col-c" v-if="item.btn" @click.native.stop="lookMore">
                <IconSvg :name="item.icon" class="navigation-more"></IconSvg>
            </Link>
            <Link class="navigation-btn-a df-col-c" v-else-if="item.link" :href="item.link" @click.native.stop="">
                <Tooltip class="navigation-tooltip df-col-c" :msg="item.alt" place="top" type="line" :show="!!item.alt">
                    <IconSvg :name="item.icon"></IconSvg>
                    <span class="navigation-text">{{item.name}}</span>
                    <div slot="content" v-html="item.html"></div>
                </Tooltip>
            </Link>
            <router-link class="navigation-btn-a df-col-c" :to="item.path" v-else @click.stop="">
                <IconSvg :name="item.icon"></IconSvg>
                <span class="navigation-text">{{item.name}}</span>
            </router-link>
        </div> -->
        <Link class="navigation-btn-a df-col-c" v-if="item.btn" @click.native.stop="lookMore">
            <IconSvg :name="item.icon" class="navigation-more"></IconSvg>
        </Link>
        <Link class="navigation-btn-a df-col-c" v-else-if="item.link" :href="item.link" @click.native.stop="">
            <Tooltip class="navigation-tooltip df-col-c" :msg="item.alt" place="top" type="line" :show="!!item.alt">
                <IconSvg :name="item.icon"></IconSvg>
                <span class="navigation-text">{{item.name}}</span>
                <div slot="content" v-html="item.html"></div>
            </Tooltip>
        </Link>
        <router-link class="navigation-btn-a df-col-c" :to="item.path" v-else @click.stop="">
            <IconSvg :name="item.icon"></IconSvg>
            <span class="navigation-text">{{item.name}}</span>
        </router-link>
    </li>
</template>
<script>
    import Tooltip from 'components/Tooltip'
    export default {
        props: ['item'],
        components: {
            Tooltip
        },
        methods: {
            lookMore() {
                this.$emit('lookMore', this.item.btn)
            },
            linkMouseover() {
                this.item.text = this.item.alt
            },
            linkMouseout() {
                this.item.text = this.item.name
            }
        }
    }
</script>

<style lang="less">
    .navigation-btn {
        border: 1px solid rgba(220, 220, 220, 0.1);
        // .navigation-btn-o {
        //     width: 100%;
        //     height: 100%;
        //     background-color: rgba(0, 0, 0, .1);
        //     position: relative;
        //     z-index: 2;
        // }
        .navigation-btn-a {
            width: 100%;
            height: 100%;
            color: #bcbcbc;
            text-align: center;
            transition: color .5s;
            svg {
                color: #fff;
                transition: color .5s;
            }
            .navigation-text {
                margin-top: 10px;
            }
        }
        .navigation-tooltip {
            width: 100%;
            height: 100%;
        }
        &:hover {
            .navigation-btn-a {
                color: #ab9e9e;
                svg {
                    color: #ab9e9e;
                }
            }
        }
    }
</style>