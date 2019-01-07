<template>
    <ul class="reply-list">
        <ol class="r-comment" v-for="(item, index) in list" :key="index">
            <div class="r-main cf">
                <div class="bg-cover fl r-avatar" :style="{backgroundImage: `url(${require(`assets/images/avatar/${item.avatar}.jpg`)})`}"></div>
                <div class="fr r-content">
                    <div class="r-meta">
                        <span>
                            <Link :href="item.url" class="r-name">{{item.isAuthor ? '作者' : item.name}}</Link>
                            回复
                            <Link :href="item.questioner.url" class="r-name">{{item.questioner.isAuthor ? '作者' : item.questioner.name}}</Link>
                        </span>
                        <span class="r-time">{{item.createTime | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
                        <span class="r-reply" @click="reply(item)">回复</span>
                    </div>
                    <p>{{item.msg}}</p>
                </div>
            </div>
        </ol>
    </ul>
</template>
<script>
export default {
    props: {
        list: {
            type: Array,
            default: []
        },
        index: Number,
        info: Object
    },
    methods: {
        reply (item) {
            this.$emit('reply', {index: this.index, item})
        }
    }
}
</script>