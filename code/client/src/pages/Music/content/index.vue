<template>
    <!-- <main class="music-main df-col-c"> -->
    <main class="music-main cf">
        <Song :class="[index%2 ? 'left' : 'right']" v-for="(item, index) in musics" :key="index" :item="item" :className="animate.classNames[animate.active]"></Song>
    </main>
</template>
<script>
    import Song from './song/index'
    export default {
        components: {
            Song
        },
        data() {
            return {
                animate: {
                    classNames: ['fadeInDown', 'fadeInUp', 'flipInX', 'rotateIn', 'zoomIn', 'rollIn', 'jackInTheBox'],
                    active: Math.floor(Math.random() * 7)
                }
            }
        },
        computed: {
            musics () {
                return this.$store.state.music.currentMusics
            }
        }
    }
</script>


