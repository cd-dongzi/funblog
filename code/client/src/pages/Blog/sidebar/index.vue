<template>
    <aside class="blog-sidebar">
        <div class="tags">
            <Tag class="tag" v-for="(item, index) in tabs" :key="index" :msg="item.name" :path="`/blog/${item.name}`" :color="item.color"></Tag>
        </div>
    </aside>
</template>
<script>
import Tag from 'components/Tag'
import config from '@/config'
export default {
    props: ['tabs'],
    components: {Tag}
}
</script>

<style lang="less">
.blog-sidebar {
    position: fixed;
    height: 100%;
    .tags {
        margin-top: 40px;
    }
    .tag {
        display: inline-block;
        margin: 5px 10px;
    }
}
</style>

