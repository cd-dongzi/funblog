<template>
    <li class="example-box">
        <h2>{{item.name}}</h2>
        <small class="example-type">{{item.type.join(',')}}</small>
        <div class="example-desc">{{item.desc}}</div>
        <!-- <div class="example-source">{{item.source}}</div> -->
        <div class="example-source">
            <img :src="require(`assets/images/source_single_${item.source}.png`)">
        </div>
        <div class="example-foot df-sb">
            <div class="download-num">下载次数：{{item.download_num}}</div>
            <div class="btns">
                <Link :href="item.url" class="btn show hover">
                    <IconSvg name="yanshi"></IconSvg>
                    <span>效果演示</span>
                </Link>
                <button class="btn btn-clear download hover" @click="download(item)">
                    <IconSvg name="32downloadcloudhower"></IconSvg>
                    <span>下载</span>
                </button>
            </div>
        </div>
        <Github class="github" v-if="item.github" :path="item.github"></Github>
        <time class="time">{{item.updateTime | parseTime('{y}-{m}-{d}')}}</time>
    </li>
</template>
<script>
    import Github from 'components/Github'
    import Example from '@/api/example'
    export default {
        props: ['item'],
        components: {
            Github
        },
        methods: {
            async download (item) {
                const url = Example.downloadExamole(item._id)
                window.open(url, '_self')
                this.item.download_num ++
            }
        }
    }
</script>