<template>
    <main class="blog-main">
        <Article v-for="(item, index) in blogs" :key="index" :item="item" :className="animate.classNames[animate.active]"></Article>
    </main>
</template>
<script>
    import Article from './article/index'
    export default {
        props: {
            blogs: {
                type: Array,
                default: []
            }
        },
        components: {
            Article
        },
        data() {
            return {
                animate: {
                    classNames: ['fadeInDown', 'fadeInUp', 'flipInX', 'rotateIn', 'zoomIn', 'rollIn', 'jackInTheBox'],
                    active: Math.floor(Math.random() * 7)
                }
            }
        },

    }
</script>