<template>
    <div class="tooltip-box" :class="[type === 'line' ? 'line-tooltip' : 'default-tooltip']">
        <slot></slot>
        <div v-show="show">
            <div v-if="msg" :class="['tooltip-arrow', 'tooltip-arrow-'+place]">{{msg}}</div>
            <div v-else :class="['tooltip-arrow', 'tooltip-arrow-'+place]">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Tag',
    props: {
        place: {
            type: String,
            default: 'right'
        },
        msg: {
            type: String
        },
        type: String,
        show: {
            type: Boolean,
            default: true
        }
    }
}
</script>
<style lang="less">
    .mixinColor (@color: @theme-color) {
        .tooltip-arrow {
            background-color: @color;
        }
        .tooltip-arrow-top::before {
            border-top-color: @color;
        }
        .tooltip-arrow-bottom::before {
            border-bottom-color: @color;
        } 
        .tooltip-arrow-left::before {
            border-left-color: @color;
        }
        .tooltip-arrow-right::before {
            border-right-color: @color;
        }
    }
    .tooltip-box {
        // display: inline-block;
        position: relative;
        &.default-tooltip {
            .mixinColor()
        } 
        &.line-tooltip {
            .mixinColor(#403a38)
        }
        .tooltip-arrow {
            min-width: 60px;
            position: absolute;
            padding: 10px;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            opacity: 0;
            transition: all .5s;
            pointer-events: none;
            font-size: 12px;
            &::before {
                content: '';
                position: absolute;
                background: transparent;
                border: 7px solid transparent;
            }
        }
        .tooltip-arrow-top {
            bottom: e("calc(100% + 12px)");
            left:50%;transform:translateX(-50%);
            margin-bottom: 20px;
            &::before {
                top: 100%;left: 50%;
                transform: translateX(-50%);
            }
        }

        .tooltip-arrow-bottom {
            top: e("calc(100% + 12px)");left:0;
            left:50%;transform:translateX(-50%);
            margin-top: 20px;
            &::before {
                bottom: 100%;left: 50%;
                transform: translateX(-50%);
            }
        }

        .tooltip-arrow-left {
            right: e("calc(100% + 12px)");
            top:50%;transform:translateY(-50%);
            margin-right: 20px;
            top: 50%;
            transform: translateY(-50%);
            &::before {
                left: 100%;top: 50%;
                transform: translateY(-50%);
            }
        }

        .tooltip-arrow-right {
            left: e("calc(100% + 12px)");
            top:50%;transform:translateY(-50%);
            margin-left: 20px;
            top: 50%;
            transform: translateY(-50%);
            &::before {
                right: 100%;top: 50%;
                transform: translateY(-50%);
            }
        }

        &:hover {
            .tooltip-arrow-top {
                opacity: 1;
                margin-bottom: 0px;
            }
            .tooltip-arrow-bottom {
                opacity: 1;
                margin-top: 0px;
            }
            .tooltip-arrow-left {
                opacity: 1;
                margin-right: 0px;
            }
            .tooltip-arrow-right {
                opacity: 1;
                margin-left: 0px;
            }
        }
    }
</style>