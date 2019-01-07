<template>
    <nav class="bg-cover pc-nav df-col-c" :style="{backgroundImage: `url(${require('assets/images/background/blog.jpg')})`}">
        <Cat class="avatar"></Cat>
        <h1 class="name">Wintermelon</h1>
        <div class="desc">是金子，总会花光的；是镜子，总会反光的</div>
        <ul class="align-c">
            <li v-for="(item, index) in linkList" :key="index" class="nav-icon">
                <Tooltip :msg="item.name" place="top">
                    <Link :href="item.link" class="df-c">
                        <IconSvg :name="item.icon"></IconSvg>
                    </Link>
                </Tooltip>
            </li>
        </ul>
        <div class="footer">
            <p class="visitors">大神到访数：{{visitors}}</p>
            <p class="slogen">All or Nothing， Now or Never</p>
        </div>
    </nav>
</template>
<script>
import Cat from 'components/Cat'
import Tooltip from 'components/Tooltip'
import linkList from '@/config/linkList'
export default {
    components: {
        Cat,
        Tooltip
    },
    data () {
        return {
            linkList
        }
    },
    computed: {
        visitors () {
            return this.$store.state.app.visitors
        }
    }
}
</script>
<style lang="less">
.pc-nav {
    position: fixed;
    height: 100%;
    width: 300px;
    left: 0;top: 0;
    color: #fff;
    .name {
        margin: 15px 0;
        font-size: 20px;
    }
    .desc {
        margin: 15px 0 25px 0;
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
        width: 100%;
        position: absolute;
        bottom: 0;left: 0;
        text-align: center;
        padding: 20px 0;
        color: #cfcfcf;
        .visitors {
            font-size: 12px;
            margin-bottom: 10px;
        }
        .slogen {
            font-size: 16px;
            font-family:Georgia;
            font-style:italic; 
        }
    }
}
</style>