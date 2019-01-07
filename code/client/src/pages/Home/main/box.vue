<template>
    <div class="home-main-box" :style="{backgroundColor: item.color}" @click="skip">
        <div class="lininde left-line"></div>
        <div class="line top-line"></div>

        <div class="top-img bg-cover" :style="{backgroundImage: `url(${item.cover})`}"></div>
        <div class="post-icon hover">
            <IconSvg :name="item.icon" :style="{color: item.color}"></IconSvg>
        </div>

        <div class="intro">
            <h2>{{item.name}}</h2>
            <!-- <div class="mouse-pointer">
                <span>按时大苏打实打实</span>
            </div> -->
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        methods: {
            skip () {
                this.$router._skip(this.item.path)
            }
        }
    }
</script>
<style lang="less">
    .home-main-box {
        width: 100%;
        height: 450px;
        // box-shadow: 0 0 5px rgba(186, 164, 119, 0.99);
        box-shadow: 0 8px 16px rgba(186, 164, 119, 0.99);
        position: relative;
        margin-top: 30px;
        transition: box-shadow .5s linear;
        &:hover {
            cursor: pointer;
            box-shadow: 0 15px 30px rgba(186, 164, 119, 0.99);
            .post-icon {
                svg {
                    font-size: 100px;
                }
            }
        }

        // .left-line,
        // .top-line {
        //     width: e("calc(100% - 20px)");
        //     height: e("calc(100% - 20px)");
        //     position: absolute;
        //     top: 10px;
        //     left: 10px;
        //     &:before {
        //         content: '';
        //         width: 100%;
        //         height: 1px;
        //         left: 0;
        //         position: absolute;
        //         background: linear-gradient(rgba(186, 164, 119, 0.99), #c1866a);
        //     }
        //     &:after {
        //         content: '';
        //         width: 1px;
        //         height: 100%;
        //         top: 0;
        //         position: absolute;
        //         background: linear-gradient(rgba(186, 164, 119, 0.99), #c1866a);
        //     }
        // }
        // .left-line {
        //     &:before {
        //         top: 0;
        //     }
        //     &:after {
        //         left: 0;
        //     }
        // }
        // .top-line {
        //     &:before {
        //         bottom: 0;
        //     }
        //     &:after {
        //         right: 0;
        //     }
        // }


        .post-icon {
            width: 140px;
            height: 140px;
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .post-icon svg {
            font-size: 80px;
            transition: all .4s;
        }

        .top-img {
            width: 100%;
            height: 50%;
            background-size: cover;
        }

        .intro {
            width: 80%;
            position: absolute;
            left: 50%;
            bottom: 13%;
            transform: translateX(-50%);
            text-align: center;
            color: #fff;
            font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;

            h2 {
                font-size: 30px;
                line-height: 60px;
                font-weight: bold;
            }

            span {
                vertical-align: middle;
                font-size: 12px;
                color: #b0bfd4;
                &:hover {
                    text-decoration: underline;
                }
            }
        }

    }
</style>