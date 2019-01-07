<template>
<article>
    <h2>添加友链</h2>
    <div class="box">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="名字" prop="name">
                <el-input type="text" v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-input type="text" v-model="info.avatar"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input type="text" v-model="info.email"></el-input>
            </el-form-item>
            <el-form-item label="链接" prop="link">
                <el-input type="text" v-model="info.link"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
                <el-input type="textarea" v-model="info.desc"></el-input>
            </el-form-item>
            <el-form-item label="是否可见" prop="isVisible" class="left-item">
                <el-switch v-model="info.isVisible"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :loading="loading">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</article>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data() {
            return {
                info: {
                    name: '',
                    avatar: '',
                    email: '',
                    link: '',
                    desc: '',
                    isVisible: true
                },
                loading: false,
                rules: {
                    name: [
                        { required: true, message: '请填写名字', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: '请填写邮箱', trigger: 'blur' }
                    ],
                    link: [
                        { required: true, message: '请填写链接', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请填写描述', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate( async (valid) => {
                    if (valid) {
                        try{
                            await this.$store.dispatch('addFriend', this.info);
                            this.loading = false
                            this.$router.push('/friend/list')
                        }catch(e) {
                            this.loading = false
                        }
                    } else {
                        console.log('error submit!!');
                        this.loading = false;
                        return false;
                    }
                });
            }
        },
        computed: {
            ...mapGetters([
                'blogTypes'
            ])
        }
    }
</script>


<style lang="less" scoped>
    article {
        text-align: center;
        padding: 0 100px;
        h2 {
            text-align: center;
            line-height: 80px;
            color: #666;
            // margin-left: 100px;
        }
        .box {
            // margin-left: 100px;
            width: 500px;
        }
        .block {
            width: 100%;
            display: block;
        }
        .left-item {
            text-align: left;
        }
        .form {
        }
        .submit {
            width: 100px;
        }
    }
</style>