<template>
    <div class="btn-line df-c">
        <div class="btn-top"></div>
        <div class="btn-bottom"></div>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Button'
}
</script>
<style lang="less">
    .btn-line {
        text-align: center;
        display: inline-block;
        vertical-align: middle;
        font-weight: bold;
        font-size: 18px;
        text-shadow:1px 0px rgba(0,0,0,.5);
        position: relative;
        margin: 0 20px;
        .btn-top, .btn-bottom {
            width: 100%;
            height: 100%;
            position: absolute;
            left:0;top:0;
            &:before {
                content: '';
                position: absolute;
                width: 100%;
                height: 1px;
                background: @theme-color;
                transition: all .5s;
                opacity: 0;
            }
            &:after {
                content: '';
                position: absolute;
                width: 1px;
                height: 100%;
                background: @theme-color;
                transition: all .5s;
                opacity: 0;
            }
        }


        .btn-top{
            &:before {
                left: -e('calc(130%)');
                top: 0;
            }
            &:after {
                left: 0;
                top: e('calc(130%)')
            }
        }

        .btn-bottom{
            &:before {
                left: e('calc(130%)');
                bottom: 0;
            }
            &:after {
                right: 0;
                bottom: e('calc(130%)')
            }
        }

        &:hover {
            .btn-top{
                &:before {
                    left: 0;
                    top: 0;
                    opacity: 1;
                }
                &:after {
                    left: 0;
                    top: 0;
                    opacity: 1;
                }
            }

            .btn-bottom{
                &:before {
                    left: 0;
                    opacity: 1;
                    bottom: 0;
                    opacity: 1;
                }
                &:after {
                    right: 0;
                    opacity: 1;
                    bottom: 0;
                    opacity: 1;
                }
            }
        }
        
    }
</style>