<template>
    <transition name="mabnifier">
        <GlobalMask v-if="show">
            <div class="mabnifier-box" @click="close">
                <img class="img" :src="url" :alt="alt">
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
export default {
    data () {
        return {
            show: false,
            url: '',
            alt: ''
        }
    },
    methods: {
        close () {
            this.show = false
        }
    }
}
</script>
<style lang="less">
    .mabnifier-enter, .mabnifier-leave-active {
        opacity: 0;
        .mabnifier-box {
            transform: translateY(-10%);
        }
    }
    .mabnifier-enter-active {
        transition: all .5s;
    }
    .mabnifier-leave-active {
        transition: all .3s;
    }
    .mabnifier-box {
        width: 100%;
        height: 100%;
        transition: transform .5s;
        .img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            cursor: zoom-out;
        }
    }
</style>