<template>
    <PullLoad v-if="currentMusic.list && currentMusic.list.length > 0" :handleLoad="handleLoad" :handleRefresh="handleRefresh" :isWindow="true" :hasMore="currentMusic.hasMore">
        <Content id="music-main"></Content>
    </PullLoad>
    <NoneData v-else msg="暂未找到该类型音乐" v-show="!isLoading"></NoneData>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import PullLoad from 'components/PullLoad'
    import Content from './content/index'
    export default {
        components: {
            Content,
            PullLoad
        },
        data() {
            return {
                pagesize: 5,
                isLoading: false
            }
        },
        computed: {
            ...mapState({
                musics: state => state.music.musics
            }),
            currentMusic() {
                return this.musics.find(item => item.name === this.classify) || this.musics.find(item => item.name === 'all')
            },
            classify () {
                return this.$route.params.classify
            }
        },
        watch: {
            $route(to, from) {
                if (to.path.indexOf('music') >= 0) {
                    this.getMusics()
                }
            }
        },
        async mounted() {
            this.getMusics()
        },
        methods: {
            getMusics() {
                this.isLoading = true
                this.$store.commit('SET_CURRENT_MUSIC_CLASSIFY', {classify: this.classify})
                return new Promise(async (resolve, reject) => {
                    try {
                        await this.$store.dispatch('getMusics', {
                            classify: this.classify,
                            pageindex: this.currentMusic.pageindex || 1,
                            pagesize: this.pagesize,
                        })
                        this.setCurrentMusics()
                        this.$bus.$emit('renderFooter')
                        this.isLoading = false
                        resolve()
                    } catch (err) {
                        reject()
                    }
                })
            },
            setCurrentMusics () {
                const currentMusic = this.musics.find(item => item.name === this.classify) || this.musics.find(item => item.name === 'all')
                this.$store.commit('SET_CURRENT_MUSICS', currentMusic.list)
            },
            handleLoad() {
                this.$store.commit('SET_MUSIC_PAGEINDEX', {
                    classify: this.classify,
                    type: 'add'
                })
                return this.getMusics()
            },
            handleRefresh() {
                this.$store.commit('SET_MUSIC_PAGEINDEX', {
                    classify: this.classify,
                    type: 'refresh'
                })
                return this.getMusics()
            }
        }
    }
</script>