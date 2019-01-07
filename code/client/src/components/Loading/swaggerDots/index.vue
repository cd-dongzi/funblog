<template>
    <div class="swagger-dots-loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>
<style lang="less">
    .swagger-dots-loading {
        width: 6em;
        height: 1em;
        position: relative;
        --duration: 2s;
        --dots: 5;
        .router-view-sm & {
            font-size: 12px;
            margin: 20px auto;
        }
        .router-view-lg & {
            font-size: 20px;
            margin: 40px auto;
        }
        span {
            position: absolute;
            width: 1em;
            height: 1em;
            background-color: @theme-color;
            border-radius: 50%;
            top: 0;
            left: 5em;
            animation: walk linear infinite,
            jump linear infinite,
            squash linear infinite;
            animation-duration: var(--duration);
            animation-delay: calc(var(--n) * var(--duration) / var(--dots) * -1);
            &:nth-child(1) {
                --n: 1;
            }

            &:nth-child(2) {
                --n: 2;
            }

            &:nth-child(3) {
                --n: 3;
            }

            &:nth-child(4) {
                --n: 4;
            }

            &:nth-child(5) {
                --n: 5;
            }
        }
    }


    @keyframes walk {
        0%,
        95%,
        100% {
            left: 5em;
        }

        80%,
        85% {
            left: 0;
        }
    }

    @keyframes jump {
        80%,
        100% {
            top: 0;
        }

        85%,
        95% {
            top: -1em;
        }
    }

    @keyframes squash {
        80%,
        100% {
            width: 1em;
            height: 1em;
        }

        90% {
            width: 1.5em;
            height: 0.8em;
        }
    }
</style>