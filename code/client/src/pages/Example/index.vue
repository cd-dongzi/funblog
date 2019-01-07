<template>
    <div id="example" class="example-layout">
        <PullLoad :handleLoad="handleLoad" :handleRefresh="handleRefresh" :isWindow="true" :hasMore="hasMore">
            <ul>
                <Item v-for="(item, index) in examples" :key="index" :item="item"></Item>
            </ul>
        </PullLoad>
    </div>
</template>
<script>
    import PullLoad from 'components/PullLoad'
    import Item from './item'
    import Example from '@/api/example'
    export default {
        name: 'Example',
        components: {
            PullLoad,
            Item
        },
        data() {
            return {
                examples: [],
                pageindex: 1,
                pagesize: 4,
                hasMore: true
            }
        },
        mounted() {
            this.$bus.$emit('onShowMsg', `这是我弄的一些小Demo哦~~`)
            document.getElementById('example').scrollIntoView({
                block: 'start',
                behavior: 'smooth' 
            })
            this.getExamples()
        },
        methods: {
            handleLoad() {
                this.pageindex ++
                this.getExamples()
            },
            handleRefresh() {
                this.pageindex = 1
                this.getExamples()
            },
            async getExamples() {
                const res = await Example.getExamples({
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                })
                const list = res.data
                if (list.length < this.pagesize) {
                    this.hasMore = false
                }else{
                    this.hasMore = true
                }
                if (this.pageindex === 1) {
                    this.examples = list
                }else{
                    this.examples = this.examples.concat(list)
                }
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>