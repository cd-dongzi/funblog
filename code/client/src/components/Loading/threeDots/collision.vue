<template>
    <div class="df-c">
        <div class="dot-collision"></div>
    </div>
</template>
<style lang="less">
    @import './variables.less';
    @import './mixin.less';
    .dot-collision {
        position: relative;
        margin: 15px 0;
        .dot;

        &::before,
        &::after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;

            .dot;
        }

        &::before {
            left: -@dotWidth;
            animation: dotCollisionBefore 2s infinite ease-in;
        }

        &::after {
            left: @dotWidth;
            animation: dotCollisionAfter 2s infinite ease-in;
            animation-delay: 1s;
        }
    }

    @keyframes dotCollisionBefore {
        0%,
        50%,
        75%,
        100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(-@dotSpacing);
        }
    }

    @keyframes dotCollisionAfter {
        0%,
        50%,
        75%,
        100% {
            transform: translateX(0);
        }

        25% {
            transform: translateX(@dotSpacing);
        }
    }
</style>