<template>
    <div class="timeline-container">
        <div class="timeline-wrapper df-col-c">
            <Year v-for="(item, index) in list" :key="index" :currentYear="item"></Year>
        </div>
    </div>
</template>
<script>
    import Month from './month'
    import Year from './year'
    export default {
        props: {
            list: {
                type: Array
            }
        },
        components: {
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