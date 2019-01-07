<template>
    <nav class="bg-cover mobile-nav df-col-c" :style="{backgroundImage: `url(${require('assets/images/background/blog.jpg')})`}">
        <Cat class="avatar"></Cat>
        <h1 class="name" :class="{fixed: nameActive}" ref="name">Wintermelon</h1>
        <div class="name-placeholder" v-if="nameActive"></div>
        <div class="desc">是金子，总会花光的；是镜子，总会反光的</div>
        <ul class="align-c">
            <li v-for="(item, index) in linkList" :key="index" class="nav-icon">
                <Link class="df-c" :href="item.link">
                    <IconSvg :name="item.icon"></IconSvg>
                </Link>
            </li>
        </ul>
        <div class="footer">
            <p class="visitors">大神到访数：{{visitors}}</p>
        </div>
    </nav>
</template>
<script>
import Cat from 'components/Cat'
import linkList from '@/config/linkList'
export default {
    components: {
        Cat
    },
    data () {
        return {
            linkList,
            nameScrollTop: 0,
            nameActive: false
        }
    },
    computed: {
        visitors () {
            return this.$store.state.app.visitors
        }
    },
    mounted () {
        this.nameScrollTop = this.$refs.name.offsetTop
        window.addEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll () {
            let t = document.documentElement.scrollTop || document.body.scrollTop
            if (t >= this.nameScrollTop) {
                this.nameActive = true
            }else{
                this.nameActive = false
            }
        }
    }
}
</script>
<style lang="less">
.mobile-nav {
    padding: 20px 0;
    color: #fff;
    .name {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 20px;
        &.fixed {
            background-color: rgba(186, 164, 119, 0.3);
            position: fixed;
            top: 0;left: 0;
        }
    }
    .name-placeholder {
        height: 40px;
    }
    .desc {
        margin: 10px 0 20px 0;
        font-size: 14px;
    }
    .nav-icon {
        margin: 0 10px;
        svg {
            color: #fff;
            font-size: 20px;
        }
    }
    .footer {
        margin-top: 20px;
        text-align: center;
        color: #cfcfcf;
        .visitors {
            font-size: 12px;
            margin-bottom: 6px;
        }
    }
}
</style>