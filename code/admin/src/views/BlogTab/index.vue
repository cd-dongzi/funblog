<template>
    <article>
        <el-button type="primary" @click="showAdd=true">添加标签</el-button>
        <ul>
            <li class="tag" v-for="(item, index) in tags" :key="index" @click="edit(item)">
                <Tag :msg="item.name" :color="item.color"></Tag>
            </li>
        </ul>

        <el-dialog title="标签编辑" :visible.sync="dialogTableVisible" class="edit-wrapper" width="50%">
            <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
                <el-form-item label="标签标题" prop="name">
                    <el-input type="text" v-model="info.name"></el-input>
                </el-form-item>
                <el-form-item label="标签描述" prop="desc">
                    <el-input type="textarea" v-model="info.desc"></el-input>
                </el-form-item>
                <el-form-item label="标签颜色" prop="color">
                    <el-input type="text" v-model="info.color"></el-input>
                </el-form-item>
                <el-form-item label="标签Icon" prop="icon">
                    <el-input type="text" v-model="info.icon"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')" :loading="loading">更新</el-button>
                    <el-button type="danger" @click="del" :loading="loading">删除</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <Add v-if="showAdd" @close="showAdd=false" @success="getBlogTabs"></Add>
    </article>
</template>
<script>
    import Tag from 'components/Tag'
    import Add from './add'
    import BlogTab from '@/api/BlogTab'
    export default {
        components: {
            Tag,
            Add
        },
        data() {
            return {
                tags: [],
                dialogTableVisible: false,
                showAdd: false,
                info: {},
                loading: false,
                rules: {
                    name: [{
                        required: true,
                        message: '请填写标签标题',
                        trigger: 'blur',
                        type: 'string'
                    }],
                    desc: [{
                        required: true,
                        message: '请填写标签描述',
                        trigger: 'blur',
                        type: 'string'
                    }],
                    color: [{
                        required: true,
                        message: '请填写标签颜色',
                        trigger: 'blur',
                        type: 'string'
                    }],
                    icon: [{
                        message: '请填写标签Icon',
                        trigger: 'blur',
                        type: 'string'
                    }]
                }
            }
        },
        created() {
            this.getBlogTabs()
        },
        methods: {
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(this.info)
                        await BlogTab.updateBlogTab(this.info._id, this.info)
                        this.loading = false
                        this.dialogTableVisible = false
                    } else {
                        console.log('error submit!!');
                        this.loading = false
                        return false;
                    }
                });
            },
            edit(item) {
                this.info = item
                this.dialogTableVisible = true
            },
            async getBlogTabs() {
                const res = await BlogTab.getBlogTabList()
                console.log(res)
                this.tags = res.data
            },
            async del () {
                console.log(this.info._id)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try {
                        await BlogTab.delBlogTab(this.info._id)
                        this.getBlogTabs()
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.dialogTableVisible = false
                    } catch (e) {
                        this.$message.error(e)
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
                
            }
        }
    }
</script>
<style lang="less" scoped>
    .tag {
        display: inline-block;
        margin: 50px;
    }
</style>