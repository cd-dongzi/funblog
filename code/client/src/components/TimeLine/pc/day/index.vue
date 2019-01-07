<template>
    <li class="timeline-item df-sb" @click="skip">
        <div class="timeline-text">{{text}}</div>
        <div class="timeline-day">{{currentDay.day}}</div>
    </li>
</template>
<script>
export default {
    props: {
        currentDay: {
            type: Object
        }
    },
    computed: {
        text () {
            if (this.currentDay.type === 'blog') {
                return `发表博客：${this.currentDay.title}`
            }else if (this.currentDay.type === 'music') {
                return `上传音乐：${this.currentDay.title}`
            }
        }
    },
    methods: {
        skip () {
            const {type, id} = this.currentDay
            if (type === 'blog') {
                this.$router._skip(`/article/${id}`)
            }else if (type === 'music') {
                this.$router._skip(`/song/${id}`)
            }
        }   
    }
}
</script>
