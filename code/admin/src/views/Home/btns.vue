<template>
    <el-row class="btn-group dfc">
        <el-col>
            <router-link class="pan-btn blue-btn" to="/music/list">Music</router-link>
        </el-col>
        <el-col>
            <router-link class="pan-btn light-blue-btn" to="/blog/list">Blog</router-link>
        </el-col>
        <el-col>
            <router-link class="pan-btn pink-btn" to="/user/list">权限管理</router-link>
        </el-col>
        <el-col>
            <router-link class="pan-btn green-btn" to="/link/list">友情链接</router-link>
        </el-col>
    </el-row>
</template>
<style lang="less" scoped>
    .btn-group {
        margin-top: 30px;
        text-align: center;
    }
</style>