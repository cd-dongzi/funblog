<template>
    <div class="home-layout">
        <Entry v-if="showEntry"></Entry>
        <MainPage v-if="showMain"></MainPage>   
    </div>
</template>
<script>
export default {
    components: {
        Entry: resolve => require(['./entry/index'], resolve),
        MainPage: resolve => require(['./main/index'], resolve)
    },
    data () {
        return {
            showEntry: false,
            showMain: false
        }
    },
    mounted () {
        this.setShow()
    },
    methods: {
        setShow () {
            import('@/utils/storage').then(({Session}) => {
                const isEntry = Session.get('entry')
                this.showEntry = !isEntry
                this.showMain = isEntry
                Session.set('entry', 1)
            })
        }
    }
}
</script>
<style lang="less">
    .home-layout {

    }
</style>