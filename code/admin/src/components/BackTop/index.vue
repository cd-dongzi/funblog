<template>
    <Icon name="backTop" class="back-top" v-show="show" @click="back"></Icon>
</template>

<script>
export default {
    data () {
        return {
            distance: 0,
            show: false,

        }
    },
    mounted () {
        this.distance = document.body.scrollTop||document.documentElement.scrollTop;
        if (this.distance >= window.screen.height/2) {
            this.show = true;
        }
        window.addEventListener('scroll', () => {
            // console.log(this.distance)
            if (this.distance >= window.screen.height/2) {
                this.show = true;
            }else{
                this.show = false;
            }
            this.distance = document.body.scrollTop||document.documentElement.scrollTop;
        })
    },
    methods: {
        back () {
            let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            this.scroll(scrollTop)
        },
        scroll (scrollTop,) {
            var speed = scrollTop/ 10;
            if (speed < 50) speed = 50;
            scrollTop -= speed;
            document.documentElement.scrollTop = scrollTop;
            document.body.scrollTop = scrollTop;
            setTimeout( () => {
                if (scrollTop > 0){
                    document.documentElement.scrollTop = 0;
                    document.body.scrollTop = 0;
                    this.scroll(scrollTop)
                }
            },30)
        }
    }
}
</script>


<style lang="less" scoped>
    .back-top {
        font-size: 40px;
        position: fixed;
        bottom: 40px;right: 10px;
        color: @vice-color;
        transition: color .5s;
        z-index: 998;
        cursor: pointer;

        &:hover {
            color: @theme-color;
        }
    }
</style>

