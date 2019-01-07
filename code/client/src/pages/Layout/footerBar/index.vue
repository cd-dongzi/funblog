<template>
    <footer id="footer" ref="footer">
        <p class="visitors">大神到访数：{{visitors}}</p>
        <p class="slogen">All or Nothing， Now or Never</p>
    </footer>
</template>
<script>
    export default {
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
        }
    }
</script>
<style lang="less">
    #footer {
        width: 100%;
        height: 80px;
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