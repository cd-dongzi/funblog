<template>
    <transition name="fade">
        <div class="music-box-list">
            <div class="nav">
                <IconSvg name="search" class="search"></IconSvg>
                <input type="text" placeholder="歌曲搜索..." v-model="keyword" @keydown.enter="search">
                <IconSvg name="refresh" class="refresh hover" @click.native="refresh" :class="{'refresh-active': isLoading}"></IconSvg>
            </div>
            <ul>
                <li class="wes hover" 
                    @click="playSong(item)" 
                    :class="{active: info.name === item.name}" 
                    v-for="(item, index) in randomMusics">{{++index}}. {{item.name}} - {{item.author}}
                </li>
            </ul>
        </div>
    </transition>
</template>
<script>
    import {mapState} from 'vuex'
    import Music from '@/api/music'
    export default {
        props: ['list'],
        data() {
            return {
                keyword: '',
                isLoading: false,
            }
        },
        computed: {
            ...mapState({
                randomMusics: state => state.music.randomMusics,
                info: state => state.music.currentMusic
            })
        },
        mounted () {
            this.getRandomMusics()
        },
        methods: {
            search() {
                this.getRandomMusics()
            },
            refresh() {
                this.getRandomMusics()
            },
            playSong(item) {
                this.$store.commit('SET_CURRENT_MUSIC', item)
                this.$bus.$emit('musicBoxPlay')
            },
            async getRandomMusics () {
                this.isLoading = true
                await this.$store.dispatch('getRandomMusics', {
                    keyword: this.keyword
                })
                this.isLoading = false
            }
        }
    }
</script>
<style lang="less">
    .transition (@time) {
        opacity: 1;
        transition: transform @time, opacity @time;
    }
    .music-box-list {
        &.fade-enter,
        &.fade-leave-active {
            opacity: 0;
            transform: scale(0);
        }
        &.fade-enter-active {
            .transition(0.5s);
        }
        &.fade-leave-active {
            .transition(0.3s);
        }
    }

    .music-box-list {
        width: 100%;
        position: absolute;
        bottom: e("calc(100% + 10px)");
        left: 0;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        font-size: 12px;
        transform-origin: left bottom;
        .nav {
            width: 100%;
            position: relative;
            .icon {
                position: absolute;
                top: 50%;
                color: @vice-color;
                font-size: 18px;

                &:hover {
                    color: @theme-color;
                }
            }
            .search {
                left: 2%;
                transform: translateY(-50%);
            }
            .refresh {
                right: 2%;
                margin-top: -10px;
            }
            .refresh-active {
                animation: refresh 1s linear infinite;
            }

            input {
                width: 100%;
                padding: 10px 34px;
                background: transparent;
                border: none; // border-bottom: 1px solid @vice-color;
                border-radius: 0;
                color: #555;
                font-size: 13px;
                vertical-align: top;
                outline: none; // color: @theme-color;
            }
        }
        ul {
            .active {
                color: @theme-color;
            }
            li {
                padding: 10px;
                &:hover {
                    color: @theme-color;
                }
            }
        }

        @keyframes refresh {
            100% {
                transform: rotate(360deg);
            }
        }
    }
</style>