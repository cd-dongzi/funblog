<template>
    <div class="bg-cover issue hover" @click="open"></div>
</template>
<script>
export default {
    methods: {
        open () {
            this.$emit('open')
        }
    }
}
</script>
<style lang="less">
    .issue {
        width: 250px;
        height: 80px;
        background-image: url('../../../../assets/images/wall/issue.png');
        position: absolute;
        left: 50%; top: 10px;
        transform: translateX(-50%);
        transition: opacity .5s;
        z-index: 98;
        &:hover {
            opacity: .8;
        }
    }
</style>