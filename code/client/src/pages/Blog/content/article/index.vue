<template>
    <section class="blog-article animated" :class="[className]">
        <div class="box">
            <Github class="github" v-if="item.github" :path="item.github"></Github>
            <h2 class="hover" @click="skip(false)">{{item.title}}</h2>
            <time>{{item.updateTime | parseTime('{y}-{m}-{d}')}}</time>
            <div class="desc">
                {{item.desc}}
                <span class="look-more hover" @click="skip(false)">查看更多</span>
            </div>
            <div class="comment hover" @click="skip(true)">
                <div class="bubble">{{item.comment_nums}}</div>
                <div class="reply">回复</div>
            </div>
            <ul class="tags">
                <li v-for="(tag, index) in item.type">
                    <Tag :msg="tag" :path="`/blog/${tag}`" :color="getColor(tag)"></Tag>
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    import Github from 'components/Github'
    import Tag from 'components/Tag'
    export default {
        props: {
            className: String,
            item: {
                type: Object,
                default: {}
            }
        },
        components: {
            Github,
            Tag
        },
        computed: {
            blogs () {
                return this.$store.state.blog.blogs || []
            }
        },
        methods: {
            getColor (tag) {
                let obj = this.blogs.find(item => item.name === tag)
                return obj && obj.color
            },
            skip(bol) {
                // this.$router._skip(`/article/${this.item._id}`, bol && {t: 'comment'})
                this.$router.push({
                    path: `/article/${this.item._id}`,
                    hash: bol && '#blog-comment'
                })
            }
        }
    }
</script>
<style lang="less">
    @red: #db5640;
    @padding: 20px;
    @margin: 40px;
    .blog-article {
        width: 100%;
        margin: @margin 0;
        background-image: url('../../../../assets/images/note-bg.jpg');
        box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.08);
        padding: 10px;
        &:first-child {
            margin-top: 0;
        }
        &:last-child {
            margin-bottom: 0;
        }
        .box {
            width: 100%;
            border: 1px dashed #c9c9c7;
            position: relative;
            padding: 33px @padding;
        }
        .github {
            position: absolute;
            right: 0;
            top: 0;
            cursor: pointer;
        }
        h2 {
            color: @red;
            font-size: 18px;
            line-height: 30px;
            margin-bottom: 10px;
            text-align: center;
        }
        time {
            display: block;
            text-align: center;
            color: #b2b2ae;
            font-size: 12px;
            margin-bottom: 22px;
            line-height: 19px;
        }
        .desc {
            font-size: 14px;
            text-align: left;
            line-height: 30px;
            text-align: justify;
            .look-more {
                color: #b2b2ae;
                font-size: 12px;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
        .comment {
            margin-top: 22px;
            text-align: center;
            &:hover {
                .bubble {
                    background-image: url('../../../../assets/images/svg/comment-hover.svg');
                }
                .reply {
                    color: @red;
                }
            }
            .bubble {
                width: 39px;
                height: 42px;
                display: inline-block;
                line-height: 39px;
                color: #f9f9f3;
                font-weight: 600;
                background-image: url('../../../../assets/images/svg/comment.svg');
            }

            .reply {
                color: #b2b2ae;
                font-size: 12px;
                margin-top: 5px;
            }
        }
        .tags {
            position: absolute;
            bottom: 5px;
            left: @padding;
            li {
                display: inline-block;
                vertical-align: middle;
            }
        }
    }
</style>
