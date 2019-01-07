<template>
    <footer id="footer" ref="footer" :style="{marginTop: `${marginTop}px`}">
        <p class="visitors">大神到访数：{{visitors}}</p>
        <p class="slogen">All or Nothing， Now or Never</p>
    </footer>
</template>
<script>
    export default {
        data () {
            return {
                marginTop: 0
            }
        },
        computed: {
            footer () {
                return this.$refs.footer
            },
            visitors () {
                return this.$store.state.app.visitors
            }
        },
        mounted () {
            // 获取总游客人数
            this.$store.dispatch('getVisitors')
            this.setMarginTop()     
        },
        watch: {
            $route () {
                this.marginTop = 0
            }
        },
        methods: {
            setMarginTop () {
                const footerH = this.footer.offsetHeight
                const screenH = this.$store.state.system.screen.height
                this.$bus.$on('renderFooter', () => {
                    this.$nextTick(() => {
                        const offsetTop = this.footer.offsetTop,
                            marginTop = parseFloat(this.footer.style.marginTop)
                        const totalH = footerH + (offsetTop - marginTop)
                        if ( totalH < screenH) {
                            this.marginTop = screenH - totalH
                        }else{
                            this.marginTop = 0
                        }
                    })
                })
            }
        }
    }
</script>
<style lang="less">
    #footer {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        .visitors {
            font-size: 14px;
            color: @theme-color;
        }
        .slogen {
            font-size: 20px;
            color: @theme-color;
            font-family:Georgia;
            font-style:italic; 
        }
        .router-view-sm &{
            // position: absolute;
            // bottom: 0px;
            // left: 0;
        }
        .router-view-lg &{
            
        }
    }
</style>