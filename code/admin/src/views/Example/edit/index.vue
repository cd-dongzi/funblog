<template>
    <article>
        <el-dialog title="演示实例编辑" :visible.sync="dialogTableVisible" class="edit-wrapper cf" @close="close" width="80%">

            <div class="box">
                <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
                    <el-form-item label="实例名" prop="title">
                        <el-input type="text" v-model="info.title"></el-input>
                    </el-form-item>
                    <el-form-item label="名字" prop="name">
                        <el-input type="text" v-model="info.name"></el-input>
                    </el-form-item>
                    <el-form-item label="实例类型" prop="type">
                        <el-select v-model="info.type" multiple clearable placeholder="请选择实例类型" class="block">
                            <el-option v-for="item in exampleTypes" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="文件类型" prop="filetype">
                        <el-select v-model="info.filetype" clearable placeholder="请选择文件类型" class="block">
                            <el-option v-for="item in fileTypes" :key="item.name" :label="item.name" :value="item.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="压缩包/文件" prop="url">
                        <el-upload class="upload-demo" drag action="" :before-upload="beforeUpload" :show-file-list="false">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或
                                <em>点击上传</em>
                            </div>
                        </el-upload>
                        <div>{{info.url}}</div>
                    </el-form-item>
                    <el-form-item label="级别" prop="album">
                        <el-select v-model="info.level" placeholder="请选择级别" class="block">
                            <el-option v-for="item in [1,2,3,4,5,6]" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="来源" prop="source">
                        <el-select v-model="info.source" placeholder="请选择来源" class="block">
                            <el-option v-for="item in sources" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="GitHub" prop="github">
                        <el-input type="text" v-model="info.github"></el-input>
                    </el-form-item>
                    <el-form-item label="介绍" prop="desc">
                        <el-input type="textarea" v-model="info.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="是否可见" prop="isVisible" class="left-item">
                        <el-switch v-model="info.isVisible"></el-switch>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')" :loading="loading">更新</el-button>
                    </el-form-item>

                </el-form>
            </div>

            <!-- <div class="tip">
            <el-collapse accordion>
                <el-collapse-item title="上传格式">
                    <pre>
        上传分两种:
            上传文件
            上传文件夹
                    </pre>
                </el-collapse-item>
                <el-collapse-item title="上传文件">
                    <pre>
        上传格式:
            例:loading.index.html
            1. loading: 会生成loading文件夹
            2. index.html: 会再loading文件夹下面生成index.html 文件

            目前可以上传 javascript、css、html
                    </pre>
                </el-collapse-item>
                <el-collapse-item title="上传文件夹">
                    <pre>
        上传格式:
            目前可以上传 zip、x-zip-compressed格式
                    </pre>
                </el-collapse-item>
            </el-collapse>
        </div> -->
        </el-dialog>
    </article>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import Example from '@/api/example'
    import {
        fileTypes,
        exampleTypes,
        sources
    } from '@/config/classify'
    export default {
        props: ['info'],
        data() {
            return {
                fileTypes,
                exampleTypes,
                sources,
                loading: false,
                dialogTableVisible: true,
                rules: {
                    type: [{
                        required: true,
                        message: '请选择至少选择一个文章类型',
                        trigger: 'change',
                        type: 'array'
                    }],
                    name: [{
                        required: true,
                        message: '请输入歌曲名字',
                        trigger: 'blur'
                    }],
                    desc: [{
                        required: true,
                        message: '请输入音乐介绍',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate(async (valid) => {
                    console.log(this.info)
                    if (valid) {
                        try {
                            delete this.info.createTime
                            let formData = new FormData();
                            for (let v in this.info) {
                                formData.append(v, this.info[v])
                            }
                            // await this.$store.dispatch('editCase', formData);
                            await Example.updateExample(this.info.filetype, this.info._id, formData)
                            this.loading = false
                            this.$router.push('/example/list')
                            this.close()
                        } catch (e) {
                            this.$message.error(e)
                            this.loading = false
                        }
                    } else {
                        console.log('error submit!!');
                        this.loading = false;
                        return false;
                    }
                });
            },
            beforeUpload(file) {
                console.log(file);
                let type = file.type,
                    files = ['html', 'css', 'javascript'],
                    folders = ['zip', 'x-zip-compressed'];

                if (folders.some(v => type.indexOf(v) >= 0) && this.info.filetype === 'folder') { //文件夹zip
                    console.log('文件夹')
                } else if (files.some(v => type.indexOf(v) >= 0) && this.info.filetype === 'file') {
                    console.log('文件')
                } else {
                    this.$message.error('请上传正确的文件格式!');
                    return false;
                }
                this.info.url = file;
            }
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
            color: #666; // margin-left: 100px;
        }
        .box {
            // margin-left: 100px;
            width: 500px;
            display: inline-block;
            vertical-align: top;
        }

        .block {
            width: 100%;
            display: block;
        }
        .left-item {
            text-align: left;
        }
        .form {}
        .submit {
            width: 100px;
        }
        .tip {
            width: 300px;
            margin-left: 50px;
            display: inline-block;
            vertical-align: top;
        }
    }
</style>