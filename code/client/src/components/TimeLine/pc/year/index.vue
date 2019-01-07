<template>
    <div class="year-timeline">
        <Month v-for="(item, index) in currentYear.months" :key="index" :currentMonth="item"></Month>
    </div>
</template>
<script>
import Month from '../month'
export default {
    props: {
        currentYear: {
            type: Object
        }
    },
    components: {
        Month
    }
}
</script>
<style lang="less">

</style>