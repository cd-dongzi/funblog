<template>
    <transition name="navigation-animate">
        <!-- <GlobalMask v-if="show" class="navigation-box df-c"  @click.native="$emit('close')" color="rgba(17, 17, 17, .65)"> -->
        <GlobalMask v-if="show" class="navigation-box df-c"  @click.native="$emit('close')" color="rgba(0, 0, 0, .65)">
            <!-- :class="{active: show}" -->
            <div class="box">
                <ul class="df-sb">
                    <Btn class="item" 
                        v-for="(item, index) in list" 
                        :key="index" 
                        :item="item" 
                        :style="[show ? getDefaultStyle(index) : getTransformStyle(index)]" @lookMore="lookMore">
                        <!-- <img :src="item.bg"> -->
                    </Btn>
                </ul>
            </div>
        </GlobalMask>
    </transition>
</template>
<script>
    import Btn from './btn'
    import linkList from '@/config/linkList'
    export default {
        props: ['show'],
        components: {
            Btn
        },
        data() {
            return {
                defaultList: [
                    { icon: 'home', name: 'Home', path: '/' },
                    { icon: 'jiaoyu_educational', name: 'Blog', path: '/blog' },
                    { icon: 'music', name: 'Music', path: '/music' },
                    { icon: 'message', name: 'Message', path: '/message' },
                    { icon: 'me', name: 'Me', path: '/me' },
                    { icon: 'guidang', name: 'Archiving', path: '/archiving' },
                    { icon: 'example', name: 'Example', path: '/example' },
                    { icon: 'icongithub', name: 'Github', link: 'https://github.com/cd-dongzi' },
                    { icon: 'email', name: 'Email', link: 'mailto:15273119291@163.com' }
                    // { icon: 'iconsf-copy', name: 'SegmentFault', link: 'https://segmentfault.com/u/zi_597d64ce14187' }
                ],
                // defaultList: [
                //     { icon: 'home', name: 'Home', path: '/', bg: require(`assets/images/navigation/home.jpeg`)},
                //     { icon: 'jiaoyu_educational', name: 'Blog', path: '/blog', bg: require(`assets/images/navigation/blog.jpg`) },
                //     { icon: 'music', name: 'Music', path: '/music', bg: require(`assets/images/navigation/music.jpeg`) },
                //     { icon: 'message', name: 'Message', path: '/message', bg: require(`assets/images/navigation/message.jpeg`) },
                //     { icon: 'me', name: 'Me', path: '/me', bg: require(`assets/images/navigation/me.jpeg`) },
                //     { icon: 'guidang', name: 'Archiving', path: '/archiving', bg: require(`assets/images/navigation/archiving.jpeg`) },
                //     { icon: 'example', name: 'Example', path: '/example', bg: require(`assets/images/navigation/example.jpeg`) },
                //     { icon: 'icongithub', name: 'Github', link: 'https://github.com/cd-dongzi', bg: require(`assets/images/navigation/blog.jpg`) }
                // ],
                moreList: linkList.slice(2),
                isMore: false
            }
        },
        computed: {
            list () {
                return this.defaultList
                // if (this.isMore) {
                //     return this.defaultList.concat(this.moreList, [{ icon: 'icon-back', btn: 'back' }])
                // }else{
                //     return this.defaultList.concat([{ icon: 'chakangengduo', btn: 'more' }])
                // }
            }
        },
        methods: {
            lookMore (type) {
                if (type === 'more') {
                    this.isMore = true
                }else {
                    this.isMore = false
                }
            },
            getTransformStyle(index) {
                let x = index % 3,
                    y = Math.ceil((index + 1) / 3)
                x = x === 0 ? '-25%' : x === 1 ? '0%' : '25%'
                y = y === 1 ? '-25%' : y === 2 ? '0%' : '25%'
                return {
                    transform: `translate3d(${x}, ${y}, 0)`
                }
            },
            getDefaultStyle(index) {
                return {
                    transform: `translate3d(0, 0, 0)`
                }
            }
        }
    }
</script>

<style lang="less">
    .navigation-animate-enter, .navigation-animate-leave-active {
        opacity: 0;
        transform: scale(1.35);
    }
    .navigation-animate-enter-active, .navigation-animate-leave-active {
        transition: transform .3s ease-in-out, opacity .3s ease-in-out
    }
</style>
