<template>
    <div class="dot-emoji"></div>
</template>
<style lang="less">
    @dotHeight: 10px;
    @d: 20px;
    .dot-emoji {
        width: 50px;
        margin: 0 auto;
        margin-bottom: 20px;
        position: relative;
        height: @dotHeight;
        font-size: 10px;
        &::before {
            content: '⚽🏀🏐';
            display: inline-block;
            position: relative;
            animation: dotEmoji 1s infinite;
        }
    }

    @keyframes dotEmoji {
        0% {
            transform: translateY(-@d);
            animation-timing-function: ease-in;
        }
        34% {
            transform: scale(1, 1);
        }
        35% {
            animation-timing-function: ease-out;
            transform: scale(1.5, .5) translateY(@d);
        }
        45% {
            transform: scale(1, 1);
        }
        90% {
            transform: translateY(-@d);
        }
        100% {
            transform: translateY(-@d);
        }
    }
</style>