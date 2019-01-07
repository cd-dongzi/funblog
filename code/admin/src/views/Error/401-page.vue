<template>
<div class="errPage-container">
    <el-button @click="back" icon='arrow-left' class="pan-back-btn">返回</el-button>
    <el-row>
        <el-col :span="12">
            <h1 class="text-jumbo text-ginormous">Oops!</h1>
            <h2 class="h2">你没有权限去该页面</h2>
            <h6 class="h6">如有不满请联系你领导</h6>
            <ul class="list-unstyled">
                <li>或者你可以去:</li>
                <li class="link-type">
                    <router-link :to="{name:'home'}">回首页</router-link>
                </li>
                <li class="link-type">
                    <a href="https://www.taobao.com/">随便看看</a>
                </li>
                <li>
                    <a @click.prevent="dialogVisible=true" href="#">点我看图</a>
                </li>
            </ul>
        </el-col>
        <el-col :span="12">
            <img :src="errGif" width="313" height="428" alt="Girl has dropped her ice cream.">
        </el-col>
    </el-row>

    <el-dialog title="随便看" :visible.sync="dialogVisible" size="middle">
        <img class="pan-img" :src="ewizardClap">
    </el-dialog>
</div>
</template>

<script>
    import errGif from 'assets/images/401.gif';
    import danceGif from 'assets/images/dance.gif';

    export default {
        data() {
            return {
                errGif: errGif + '?' + +new Date(),
                ewizardClap: danceGif,
                dialogVisible: false
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            }
        }
    };
</script>

<style lang="less" scoped>
    .errPage-container {
        width: 800px;
        margin: 100px auto;
        .pan-back-btn {
            background: #008489;
            color: #fff;
        }
        .h2 {
            display: block;
            font-size: 1.5em;
            -webkit-margin-before: 0.83em;
            -webkit-margin-after: 0.83em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }
        .h6 {
            display: block;
            font-size: 0.67em;
            -webkit-margin-before: 2.33em;
            -webkit-margin-after: 2.33em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            font-weight: bold;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
            font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
        }
        .pan-gif {
            margin: 0 auto;
            display: block;
        }
        .pan-img {
            display: block;
            margin: 0 auto;
        }
        .text-jumbo {
            font-size: 60px;
            font-weight: 700;
            color: #484848;
        }
        .list-unstyled {
            font-size: 14px;
            display: block;
            list-style-type: disc;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0px;
            -webkit-margin-end: 0px;
            -webkit-padding-start: 40px;
            .list-type {
                color: #337ab7;
                cursor: pointer;
            }
            li {
                padding-bottom: 5px;
                list-style-type: disc;
                line-height: 20px;
            }
            a {
                color: #008489;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
        }
    }
</style>
