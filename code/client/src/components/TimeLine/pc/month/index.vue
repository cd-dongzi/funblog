<template>
    <div class="month-timeline">
        <time class="timeline-t" :id="currentMonth.month">{{currentMonth.month}}</time>
        <ul class="time-line-items">
            <Day v-for="(item, index) in currentMonth.days" :key="index" :currentDay="item"></Day>
        </ul>
    </div>
</template>
<script>
import Day from '../day'
export default {
    props: {
        currentMonth: {
            type: Object
        }
    },
    components: {
        Day
    }
}
</script>