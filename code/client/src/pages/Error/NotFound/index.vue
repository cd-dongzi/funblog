<template>
    <div class="page-404 df-c">
        <div class="box df-c">
            <Navigation v-if="!showBtns"></Navigation>
            <img :src="errGif" alt="Girl has dropped her ice cream." class="errGif">
            <div class="btns" v-if="showBtns">
                <ButtonComponent class="btn" @click.native="$router._skip('/')">我要回家</ButtonComponent>
                <ButtonComponent class="btn" @click.native="$router._skip('/music')">听听音乐</ButtonComponent>
                <ButtonComponent class="btn" @click.native="$router._skip('/blog')">看看文章</ButtonComponent>
            </div>
        </div>
    </div>
</template>
<script>
    import errGif from 'assets/images/404.gif'
    import ButtonComponent from 'components/Button'
    import setShowMixin from '@/mixins/setShow'
    import Navigation from 'components/Navigation'
    export default {
        mixins: [setShowMixin],
        components: {
            ButtonComponent,
            Navigation
        },
        data() {
            return {
                errGif: errGif + '?' + +new Date(),
                showBtns: false
            }
        },
        methods: {
            setShow () {
                const bol = this.screenSize === 'sm'
                this.showBtns = !bol
            }
        }
    }
</script>
<style lang="less">
    .page-404 {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #fff;

        .box {
            text-align: center;
            margin-top: 20px;
            &.hide {
                display: none;
            }
            .btn {
                width: 150px;
                text-align: center;
                display: block;
                padding: 10px 0;
                font-size: 20px;
                color: @theme-color;
                margin: 0 auto;
            }
        }
    }
</style>