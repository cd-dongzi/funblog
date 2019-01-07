<template>
    <el-dialog title="添加标签" :visible.sync="dialogTableVisible" class="edit-wrapper" width="50%" @close="$emit('close')">
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
                <el-button type="primary" @click="submitForm('form')" :loading="loading">添加</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import MusicTab from '@/api/MusicTab'
    export default {
        data() {
            return {
                dialogTableVisible: true,
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
                        required: true,
                        message: '请填写标签Icon',
                        trigger: 'blur',
                        type: 'string'
                    }]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        console.log(this.info)
                        await MusicTab.addMusicTab(this.info)
                        this.loading = false
                        this.dialogTableVisible = false
                        this.$emit('success')
                    } else {
                        console.log('error submit!!');
                        this.loading = false
                        return false;
                    }
                });
            }
        }
    }
</script>