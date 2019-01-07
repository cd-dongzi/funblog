<template>
    <div class="global-mask" :style="{backgroundColor: color}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        color: {
            type: String,
            default: 'rgba(0, 0, 0, 0.5)'
        }
    }
}
</script>

<style lang="less">
.global-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;top: 0;
    z-index: 999;
}
</style>