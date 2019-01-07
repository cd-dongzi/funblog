<template>
    <section class="song animated" :class="[className]">
        <div class="intro" @click="skip">
            <div class="cover bg-cover" :style="{backgroundImage: `url(${item.cover})`}">
                <div class="intro-b">
                    <h2 class="name">{{item.name}}</h2>
                    <time class="time">{{item.releaseTime | parseTime('{y}-{m}-{d}')}}</time>
                </div>
            </div>
            <!-- <img :src="item.cover" alt=""> -->
        </div>
        <div class="record df-c">
            <div class="cd bg-cover" :style="{backgroundImage: `url(${require('assets/images/svg/record.svg')})`}"></div>
        </div>
    </section>
</template>
<script>
    export default {
        props: {
            className: String,
            item: {
                type: Object,
                default: {}
            }
        },
        methods: {
            skip() {
                this.$router._skip(`/song/${this.item._id}`)
            }
        }
    }
</script>
<style lang="less">
    .song {
        width: 3.55rem;
        height: 3.55rem;
        max-width: 320px;
        max-height: 320px;
        position: relative;
        .intro {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 10;
            .cover {
                width: 100%;
                height: 100%;
            }
            .intro-b {
                width: 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                background: rgba(0, 0, 0, .3);
                padding-left: 15px;
            }
            .name {
                margin: 10px 0 6px 0;
                font-size: 20px;
                color: #fff;
                &:before {
                    content: url('../../../../assets/images/svg/music-note.svg');
                    display: inline-block;
                    margin-right: 10px;
                }
            }
            .time {
                display: inline-block;
                margin-bottom: 8px;
                font-size: 14px;
            }
        }

        .record {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 9;
            top: 0;
            transition: transform .5s;
            .cd {
                width: 90%;
                height: 90%;
            }
        }
        
        @media screen and (max-width: 550px){
            .record {
                display: none;
            }
        }
    }
</style>