<template>
    <button class="navigation-toggle" :class="{active: open}" @click="toggle">
        <div class="toggle-body">
            <div class="toggle-item" v-for="num in 9" :key="num" :style="[getStyle(num), open ? getTransformStyle(num):'']"></div>
        </div>
    </button>
</template>
<script>
    export default {
        props: ['open'],
        methods: {
            toggle() {
                this.$emit('toggle', this.open)
            },
            getStyle(num) {
                num--
                return {
                    left: `${num%3*10}px`,
                    top: `${Math.floor(num/3)*10}px`
                }
            },
            getTransformStyle(num) {
                let l = num % 3,
                    t = Math.ceil(num / 3)
                l = l === 0 ? -5 : l === 1 ? 5 : 0
                t = t === 1 ? 5 : t === 2 ? 0 : -5
                return {
                    transform: `translate(${l}px, ${t}px)`
                }
            }
        }
    }
</script>

<style lang="less">
    .navigation-toggle {
        outline: none;
        border: none;
        background: none;
        position: relative;
        z-index: 10;
        .toggle-body {
            width: 24px;
            height: 24px;
            position: relative;
        }
        .toggle-item {
            height: 4px;
            width: 4px;
            background-color: @theme-color;
            position: absolute;
            transition: transform .3s;
        }
        &.active {
            .toggle-item {
                background-color: #aaa;
            }
        }
    }
</style>
