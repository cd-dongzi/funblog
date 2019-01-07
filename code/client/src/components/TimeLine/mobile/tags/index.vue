<template>
    <ul>
        <li 
            class="timeline-tag hover" 
            :class="{'timeline-tag-active': index===currentIndex, 'border-1px-b': index < list.length-1}"
            v-for="(item, index) in list" 
            @click="switchDate(item, index)">
            {{item.year}}
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        list: Array
    },
    data () {
        return {
            currentIndex: 0
        }
    },
    methods: {
        switchDate (item, index) {
            this.currentIndex = index
            this.$emit('switchDate', item.months[0].month)
        }
    }
}
</script>