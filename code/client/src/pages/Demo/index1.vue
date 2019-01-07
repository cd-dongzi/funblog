<template>
    <div class="demo">
        <!-- <emoji></emoji> -->
        <!-- <overtaking></overtaking> -->
        <!-- <collision></collision> -->
            <emoji slot="header"></emoji>
            <collision slot="footer"></collision>
        <PullLoad :handleRefresh="handleRefresh" :handleLoad="handleLoad" :isWindow="true">
            <emoji slot="header"></emoji>
            <collision slot="footer"></collision>
            <ul>
                <li v-for="item in num" :key="item">{{item}}</li>
            </ul>
            <collision slot="footer"></collision>
            <!-- <emoji slot="footer"></emoji> -->
        </PullLoad>
    </div>
</template>
<script>
    import PullLoad from 'components/PullLoad'
    import emoji from 'components/Loading/threeDots/emoji'
    import overtaking from 'components/Loading/threeDots/overtaking'
    import collision from 'components/Loading/threeDots/collision'
    export default {
        components: {
            PullLoad,
            emoji,
            overtaking,
            collision
        },
        data () {
            return {
                num: 10
            }
        },
        methods: {
            handleRefresh () {
                return new Promise(r => {
                    setTimeout(() => {
                        this.num = 10
                        r()
                    }, 2000)
                })
            },
            handleLoad () {
                return new Promise(r => {
                    setTimeout(() => {
                        this.num += 10
                        r()
                    }, 2000)
                })
            }
        }
    }
</script>
<style lang="less">
    .demo {
        li {
            height: 80px;
            background-color: #ccc;
            margin: 20px;
        }
    }
    
</style>