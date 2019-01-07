<template>
    <div>
        <PullLoad :handleRefresh="handleRefresh" :handleLoad="handleLoad" :isWindow="true">
            <ul class="demo">
                <li v-for="item in len" :key="item">阶段{{item}}</li>
            </ul>
        </PullLoad>
    </div>
</template>
<script>
    import PullLoad from 'components/PullLoad'
    import {
        setTimeout
    } from 'timers';
    export default {
        components: {
            PullLoad
        },
        data() {
            return {
                show: false,
                len: 10
            }
        },
        mounted() {

        },
        methods: {
            handleRefresh() {
                return this.getData(false)
            },
            handleLoad() {
                return this.getData(true)
            },
            getData(bol) {
                return new Promise(r => {
                    setTimeout(() => {
                        this.len = bol ? this.len + 10 : 10
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
            background-color: green;
            margin: 20px auto;
            height: 50px;
            border: 1px solid blue;
        }
    }
</style>