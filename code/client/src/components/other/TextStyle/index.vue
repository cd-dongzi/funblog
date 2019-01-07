<template>
    <svg>
        <filter id='light2'>
            <feGaussianBlur in='SourceAlpha' stdDeviation='2' result='blur' />
            <feSpecularLighting in='blur' surfaceScale='4' specularConstant='1' specularExponent='14' lighting-color='#eee' result='specOut'>
                <fePointLight x='-8000' y='-10000' z='5000' />
            </feSpecularLighting>
            <feComposite in='specOut' in2='SourceAlpha' operator='in' result='light' />
            <feComposite in='SourceGraphic' in2='light' operator='arithmetic' k1='0' k2='1' k3='1' k4='0' />
        </filter>
    </svg>
</template>
<style lang="less">
    .p5 {
        font-family: Britannic Bold;
        color: #ccc;
        text-shadow: -1px -1px #333, 1px 1px #fff;
    }

    .svg-text {
        position: relative;
        letter-spacing: 0.07em;
        font-size: 40px;
        font-weight: normal;
        margin: 0 auto;
        &::after,
        &::before {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);

        }
        &:after {
            content: attr(data-text);
        }
        &.svg-text1 {
            font-family: cursive;
            color: rgba(40, 80, 120, 0.9);
            text-shadow: -1px -1px 1px #000, 0 -1px 1px #000, 1px -1px 1px #000,
            1px 0 1px #000, 1px 1px 1px #000, 0 1px 1px #000, -1px 1px 1px #000,
            -1px 0 1px #000, 0 0 4px #000;
            &::after {
                text-shadow: none;
                opacity: 1;
                filter: url(#light2);
            }
        }

        &.svg-text2 {
            color: hsl(200, 75%, 35%);
            text-shadow: 0 0 1px currentColor, -1px -1px 1px hsl(200, 75%, 45%),
            0 -1px 1px hsl(200, 75%, 40%), -1px 0 1px hsl(200, 75%, 35%),
            1px -1px 1px hsl(200, 75%, 35%), 1px 0 1px hsl(200, 75%, 30%),
            1px 1px 1px hsl(200, 75%, 30%), 0 1px 1px hsl(200, 75%, 30%),
            -1px 1px 1px hsl(200, 75%, 30%), -2px -2px 1px hsl(200, 75%, 75%),
            -2px -1px 1px hsl(200, 75%, 60%), -2px 0 1px hsl(200, 75%, 60%),
            -1px -2px 1px hsl(200, 75%, 50%), 0 -2px 1px hsl(200, 75%, 50%),
            1px -2px 1px hsl(200, 75%, 50%), 2px -2px 1px hsl(200, 75%, 35%),
            2px -1px 1px hsl(200, 75%, 35%), 2px 0 1px hsl(200, 75%, 30%),
            2px 1px 1px hsl(200, 75%, 10%), 2px 2px 1px hsl(200, 75%, 10%),
            1px 2px 1px hsl(200, 75%, 15%), 0 2px 1px hsl(200, 75%, 10%),
            -1px 2px 1px hsl(200, 75%, 20%), -2px 2px 1px hsl(200, 75%, 20%),
            -2px 1px 1px hsl(200, 75%, 10%), -3px -3px 1px #006,
            -2px -3px 1px #006, -1px -3px 1px #006, 0 -3px 1px #006,
            1px -3px 1px #006, 2px -3px 1px #006, 3px -3px 1px #006,
            3px -2px 1px #006, 3px -1px 1px #006, 3px 0 1px #006,
            3px 1px 1px #006, 3px 2px 1px #006, 3px 3px 2px #006,
            2px 3px 1px #006, 1px 3px 1px #006, 0 3px 1px #006,
            -1px 3px 1px #006, -2px 3px 1px #006, -3px 3px 1px #006,
            -3px 2px 1px #006, -3px 1px 1px #006, -3px 0 1px #006,
            -3px -1px 1px #006, -3px -2px 1px #006;
            &::before {
                top: -4px;
                margin-left: -4px;
                color: transparent;
                text-shadow: 1px 1px 3px hsl(200, 75%, 75%);
                opacity: 0.4;
            }
        }

        &.svg-text3 {
            color: hsl(10, 100%, 40%);
            text-shadow: 0 0 2px currentColor,
            0 -1px 1px hsl(40, 100%, 80%),
            -1px -1px 1px hsl(10, 100%, 40%),
            1px -1px 1px hsl(10, 100%, 40%),
            1px 0 1px hsl(10, 100%, 40%),
            0 -1px 1px hsl(10, 100%, 40%),
            0 1px 1px hsl(10, 100%, 20%),
            1px 1px 1px hsl(10, 100%, 40%),
            -1px 1px 1px hsl(10, 100%, 40%),

            -2px -2px 1px hsl(10, 100%, 20%),
            -1px -2px 1px hsl(10, 100%, 20%),
            0 -2px 1px hsl(10, 100%, 20%),
            1px -2px 1px hsl(10, 100%, 20%),
            2px -2px 1px hsl(10, 100%, 20%),
            2px -1px 1px hsl(10, 100%, 20%),
            2px 0 1px hsl(10, 100%, 20%),
            2px 1px 1px hsl(10, 100%, 20%),
            2px 2px 1px hsl(10, 100%, 20%),
            1px 2px 1px hsl(10, 100%, 20%),
            0 2px 3px hsl(10, 100%, 20%),
            -1px 2px 1px hsl(10, 100%, 20%),
            -2px 2px 1px hsl(10, 100%, 20%),
            -2px 1px 1px hsl(10, 100%, 20%),
            -2px 0 1px hsl(10, 100%, 20%),
            -2px -1px 1px hsl(10, 100%, 20%);
            &::before {
                content: attr(data-text);
                top: -3px;
                color: transparent;
                text-shadow: 0 1px 2px #ff6;
                opacity: .4
            }
            &::after {
                top: .3em;
                color: transparent;
                text-shadow: 0 0 6px rgba(0, 0, 0, .6), 0 0 8px rgba(0, 0, 0, .8);
                transform: scaleY(.5);
                z-index: -1
            }
        }

        &.test {
            font-weight: bold;
            color: #083058/*FF*/
            ;
            text-shadow: 0 0 1px currentColor,
            2px 0 1px #98c0e8, 0 2px 1px #083058, 2px 1px 1px #98c0e8, 1px 2px 1px #083058, 2px 2px 1px #487098,
            3px 1px 1px #98c0e8, 1px 3px 1px #083058, 3px 2px 1px #98c0e8, 2px 3px 1px #083058, 3px 3px 1px #487098,
            4px 2px 1px #98c0e8, 2px 4px 1px #083058, 4px 3px 1px #98c0e8, 3px 4px 1px #083058, 4px 4px 1px #487098,
            5px 3px 1px #98c0e8, 3px 5px 1px #083058, 5px 4px 1px #98c0e8, 4px 5px 1px #083058, 5px 5px 1px #487098,
            6px 4px 1px #98c0e8, 4px 6px 1px #083058, 6px 5px 1px #98c0e8, 5px 6px 1px #083058, 6px 6px 1px #487098,
            7px 5px 1px #98c0e8, 5px 7px 1px #083058, 7px 6px 1px #98c0e8, 6px 7px 1px #083058, 7px 7px 1px #487098,
            8px 6px 1px #98c0e8, 6px 8px 1px #083058, 8px 7px 1px #98c0e8, 7px 8px 1px #083058, 8px 8px 1px #487098,
            9px 7px 1px #98c0e8, 7px 9px 1px #083058, 9px 8px 1px #98c0e8, 8px 9px 1px #083058, 9px 9px 1px #487098,
            10px 8px 1px #98c0e8, 8px 10px 1px #083058, 10px 9px 1px #98c0e8, 9px 10px 1px #083058, 10px 10px 1px #487098,
            11px 9px 1px #98c0e8, 9px 11px 1px #083058, 11px 10px 1px #98c0e8, 10px 11px 1px #083058, 11px 11px 1px #487098,
            2px -1px 1px #666,
            3px 0 1px #666,
            4px 1px 1px #666,
            5px 2px 1px #666,
            6px 3px 1px #666,
            7px 4px 1px #666,
            8px 5px 1px #666,
            9px 6px 1px #666,
            10px 7px 1px #666,
            11px 8px 1px #666,
            12px 9px 1px #666,
            12px 10px 1px #666,
            11px 11px 1px #666
        }
        .test:before,
        .test:after {
            content: attr(data-text);
        }
        .test:before {
            color: rgb(40, 80, 120);
            text-shadow: 0 0 1px currentColor, -1px -1px 1px #000, 0 -1px 1px #000, 1px -1px 1px #000, 1px 0 1px #000, 1px 1px 1px #000, 0 1px 1px #000, -1px 1px 1px #000, -1px 0 1px #000
        }
        .test:after {
            color: rgba(40, 80, 120, .1);
            text-shadow: -1px 0 1px rgba(40, 80, 120, .8), 1px -1px 1px rgba(255, 255, 255, .8);
            -webkit-filter: url(#light-top);
            filter: url(#light-top)
        }

    }
</style>
