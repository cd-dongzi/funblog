<template>
    <div id="back" class="align-c hover" @click="back">
        <IconSvg name="fanhui"></IconSvg>
        <span>Back</span>
    </div>
</template>
<script>
export default {
    props: {
        path: {
            type: String,
            require: true
        }
    },
    methods: {
        back () {
            if (this.$store.state.route.from.path === '/') {
                this.$router._goBack(this.path)  
            }else{
                this.$router._goBack()
            }
        }
    }
}
</script>
<style lang="less">
.router-view-sm {
    #back {
        display: none;
    }
}
#back {
    padding: 20px 0;
    color: @vice-color;
    svg {
        font-size: 26px;
    }
    span {
        font-size: 14px;
        margin-left: 4px;
    }
    &:hover {
        color: @theme-color;
    }
}
</style>