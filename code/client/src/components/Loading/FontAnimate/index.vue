<template>
    <div class="font-container" :style="">
        <div class="animate">
            <span v-for="(item, index) in text" :key="index" :style="{animationDelay: `${index*speed}s`, animationDuration: `${text.length*speed}s`}">{{item}}</span>
        </div>
    </div>
</template>
<script>
    import {randNumber} from 'utils/number'
    export default {
        props: {
            text: {
                type: String,
                default: '数据加载中...'
            }
        },
        data () {
            return {
                rand: 7,
                speed: 0.15
            }
        },
        methods: {
            animationEnd () {
                // this.rand = randNumber(1, 8)
                // console.log(11)
                // console.log(this.rand)
            }
        }
    }
</script>
<style lang="less">
    .font-container {
        text-align: center;
        @h: 40;
        @s: 55%;
        @l: 34%;
        .animate span {
            color: hsl(@h, @s, @l);
            display: inline-block;
            animation: fontLoadingAnimate linear infinite;
        }
        @keyframes fontLoadingAnimate {
            11% {
                color: hsl(@h*2, @s, @l);
            }
            22% {
                color: hsl(@h*3, @s, @l);
                transform: translate(0, 5px);
            }
            33% {
                color: hsl(@h*4, @s, @l);
            }
            44% {
                color: hsl(@h*5, @s, @l);
                transform: translate(0, 0px);
            }
            55% {
                color: hsl(@h*6, @s, @l);
            }
            66% {
                color: hsl(@h*7, @s, @l);
                transform: translate(0, -5px);
            }
            77% {
                color: hsl(@h*8, @s, @l);
            }
            88% {
                color: hsl(@h*9, @s, @l);
            }
            100% {
                color: hsl(@h, @s, @l);
                transform: translate(0, 0px);
            }
        }
        // /* Animation One */
        // .animate-1 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: translate(-150px, -50px) rotate(-180deg) scale(3);
        //     animation: revolveScale 3s forwards;
        // }

        // @keyframes revolveScale {
        //     60% {
        //         transform: translate(20px, 20px) rotate(30deg) scale(.3);
        //         color: hsl(360, 55%, 34%);
        //     }
        //     100% {
        //         transform: translate(0) rotate(0) scale(1);
        //         opacity: 1;
        //     }
        // }


        // /* Animation Two */
        // .animate-2 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: translate(200px, -100px) scale(2);
        //     animation: ballDrop 3s forwards;
        // }

        // @keyframes ballDrop {
        //     60% {
        //         transform: translate(0, 20px) rotate(-180deg) scale(.5);
        //         color: hsl(360, 55%, 34%);
        //     }
        //     100% {
        //         transform: translate(0) rotate(0deg) scale(1);
        //         opacity: 1;
        //     }
        // }


        // /* Animation Three */
        // .animate-3 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: translate(-300px, 0) scale(0);
        //     animation: sideSlide .5s forwards;
        // }

        // @keyframes sideSlide {
        //     60% {
        //         transform: translate(20px, 0) scale(1);
        //         color: hsl(260, 55%, 34%);
        //     }
        //     80% {
        //         transform: translate(20px, 0) scale(1);
        //         color: hsl(300, 55%, 34%);
        //     }
        //     99% {
        //         transform: translate(0) scale(1.2);
        //         color: hsl(340, 55%, 34%);
        //     }
        //     100% {
        //         transform: translate(0) scale(1);
        //         opacity: 1;
        //         color: #b10e81;
        //     }
        // }


        // /* Animation Four */
        // .animate-4 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: translate(0, -100px) rotate(360deg) scale(0);
        //     animation: revolveDrop 3s forwards;
        // }

        // @keyframes revolveDrop {
        //     0% {
        //         transform: translate(0, -50px) rotate(180deg) scale(1);
        //     }
        //     15% {
        //         transform: translate(0, 20px) scale(.8) rotate(0deg);
        //     }
        //     25% {
        //         transform: translate(0) scale(1) rotate(0deg);
        //         opacity: 1;
        //     }
        //     40% {
        //         transform: translate(0, 20px) scale(.8) rotate(0deg);
        //     }
        //     50% {
        //         transform: translate(0, -50px) rotate(180deg) scale(1);
        //         opacity: 1;
        //     }
        //     100% {
        //         opacity: 1;
        //         transform: translate(0) scale(1) rotate(0deg);
        //     }
        // }


        // /* Animation Five */
        // .animate-5 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: translate(0, -100px) rotate(360deg) scale(0);
        //     animation: dropVanish 5s forwards;
        // }

        // @keyframes dropVanish {
        //     30% {
        //         transform: translate(0, -50px) rotate(180deg) scale(1);
        //     }
        //     50% {
        //         transform: translate(0, 20px) scale(.8) rotate(0deg);
        //         opacity: 1;
        //     }
        //     80% {
        //         transform: translate(-100px, -100px) scale(1.5) rotate(-180deg);
        //         opacity: 0;
        //     }
        //     100% {
        //         transform: translate(0) scale(1) rotate(0deg);
        //         opacity: 1;
        //     }
        // }


        // /* Animation Six */
        // .animate-6 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0;
        //     transform: rotate(-180deg) translate(150px, 0);
        //     animation: twister 5s forwards;
        // }

        // @keyframes twister {
        //     10% {
        //         opacity: 1;
        //     }
        //     100% {
        //         transform: rotate(0deg) translate(0);
        //         opacity: 1;
        //     }
        // }


        // /* Animation Seven */
        // .animate-7 span {
        //     color: hsl(40, 55%, 34%);
        //     opacity: 0.3;
        //     transform: translate(0) scale(.5);
        //     animation: leftRight 2s linear infinite;
        // }

        // @keyframes leftRight {
        //     30% {
        //         transform: translate(100px, 0) scale(.7);
        //         opacity: 1;
        //         color: hsl(200, 55%, 34%);
        //     }
        //     45% {
        //         color: hsl(250, 55%, 34%);
        //     }
        //     60% {
        //         transform: translate(0) scale(1.5);
        //         opacity: 0.3;
        //     }
        //     75% {
        //         transform: translate(0) scale(1);
        //         opacity: 1;
        //     }
        //     100% {
        //         transform: translate(0) scale(0.5);
        //         opacity: 0.3;
        //         color: hsl(40, 55%, 34%);
        //     }
        // }
    }
</style>