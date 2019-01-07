<template>
    <div class="timeline-container cf df-c">
        <Tags class="timeline-tags fl" :list="list" @switchDate="switchDate"></Tags>
        <div class="timeline-wrapper fr">
            <Year v-for="(item, index) in list" :key="index" :currentYear="item"></Year>
        </div>
    </div>
</template>
<script>
    import Month from './month'
    import Year from './year'
    import Tags from './tags'
    export default {
        props: {
            list: {
                type: Array
            }
        },
        components: {
            Tags,
            Year,
            Month
        },
        methods: {
            switchDate (id) {
                document.getElementById(id).scrollIntoView({
                    block: 'start',
                    behavior: 'smooth' 
                })
            }
        }
    }
</script>
<style lang="less">
    @import './style.less';
</style>