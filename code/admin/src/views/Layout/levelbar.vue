<template>
<el-breadcrumb class="app-levelbar" separator="/">
    <!-- <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.name}}</router-link>
    </el-breadcrumb-item> -->
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
        <router-link :to="item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
    export default {
        created() {
            this.getBreadcrumb();
        },
        data() {
            return {
                levelList: []
            };
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.name);
                let first = matched[0],
                    second = matched[1];
                if (first && first.name !== '首页' && first.name !== '') {
                    matched = [{name: '首页', path: '/'}].concat(matched);
                }
                if (second && second.name === '首页') {
                    this.levelList = [second];
                }else{
                    this.levelList = matched;
                }

            }
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        }
    };
</script>

<style lang="less" scoped>
    .app-levelbar.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }
</style>