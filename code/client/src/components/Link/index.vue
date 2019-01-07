<template>
    <a :href="href || 'javascript:;'" :alt="alt" rel="nofollow" target="_blank">
        <slot></slot>
    </a>
</template>
<script>
export default {
    props: {
        href: {
            type: String,
            default: 'javascript:;'
        },
        alt: String
    }
}
</script>
<style lang="less">

</style>