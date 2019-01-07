<template>
    <el-dialog title="歌曲编辑" :visible.sync="dialogTableVisible" class="edit-wrapper" @close="close">
        <el-form :model="info" :rules="rules" ref="form" label-width="100px" class="form">
            <el-form-item label="音乐类型" prop="type">
                <el-select v-model="info.type" multiple clearable placeholder="请选择音乐类型" class="block">
                    <el-option v-for="item in musicTypes" :key="item.name" :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="歌曲名字" prop="name">
                <el-input type="text" v-model="info.name"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
                <el-input type="text" v-model="info.author"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="cover">
                <el-upload class="music-cover-uploader" action="" :show-file-list="false" :before-upload="beforeCoverUpload">
                    <img v-if="info.cover" :src="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="链接地址" prop="url">
                <el-upload class="upload-demo" drag action="" :before-upload="beforeMusicUpload" :show-file-list="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或
                        <em>点击上传</em>
                    </div>
                </el-upload>
                <div>{{info.url.name || info.name}}</div>
            </el-form-item>
            <el-form-item label="级别" prop="level">
                <el-select v-model="info.level" placeholder="请选择级别" class="block">
                    <el-option v-for="item in [1,2,3,4,5,6]" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="发布时间" prop="releaseTime">
                <el-date-picker class="block" v-model="info.releaseTime" type="date" placeholder="选择发布日期"></el-date-picker>
                <!-- <el-input type="text" v-model="info.releaseTime"></el-input> -->
            </el-form-item>
            <el-form-item label="隶属专辑" prop="album">
                <el-input type="text" v-model="info.album"></el-input>
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
    </el-dialog>
</template>


<script>
    import {
        mapGetters
    } from 'vuex'
    import Music from '@/api/music'
    import MusicTab from '@/api/MusicTab'
    export default {
        props: ['info'],
        data() {
            return {
                musicTypes: [],
                dialogTableVisible: true,
                loading: false,
                imgUrl: '',
                rules: {
                    type: [{
                        required: true,
                        message: '请选择至少选择一个音乐类型',
                        trigger: 'change',
                        type: 'array'
                    }],
                    name: [{
                        required: true,
                        message: '请输入歌曲名字',
                        trigger: 'blur'
                    }],
                    author: [{
                        required: true,
                        message: '请输入作者名字',
                        trigger: 'blur'
                    }],
                    // cover: [
                    //     { required: false, message: '请选择图片', trigger: 'change', type: 'object' }
                    // ],
                    // url: [
                    //     { required: true, message: '请输入音乐的链接地址', trigger: 'blur' }
                    // ],
                    // releaseTime: [
                    //     { required: true, message: '请选择音乐的发布时间', trigger: 'change', type: 'date' }
                    // ],
                    desc: [{
                        required: true,
                        message: '请输入音乐介绍',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            this.imgUrl = this.info.cover
            this.getMusicTabs()
        },
        methods: {
            async getMusicTabs() {
                const res = await MusicTab.getMusicTabList()
                console.log(res)
                this.musicTypes = res.data
            },
            close() {
                this.$emit('close')
            },
            submitForm(formName) {
                this.loading = true;
                this.$refs[formName].validate(async (valid) => {
                    console.log(this.info)
                    if (!this.info.cover) {
                        this.$message.error('请选择图片')
                    }
                    if (valid) {
                        let formData = new FormData();
                        for (let v in this.info) {
                            formData.append(v, this.info[v])
                        }
                        try {
                            Music.updateMusic(this.info._id, formData)
                            this.loading = false
                            this.close()
                        } catch (e) {
                            this.loading = false;
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            beforeCoverUpload(file) {

                console.log(file)
                this.info.cover = file;
                if (!/(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.type)) {
                    this.$message.error('请上传正确的图片格式!');
                    return false;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }

                var reader = new FileReader();
                reader.onload = (res) => {
                    this.imgUrl = res.target.result
                }
                reader.readAsDataURL(file);
            },
            beforeMusicUpload(file) {
                console.log(file)
                if (!/(mp3)$/.test(file.type)) {
                    this.$message.error('请上传正确的音频格式!');
                    return false;
                }
                this.info.url = file;
            }
        },
    }
</script>


<style lang="less" scoped>
    .edit-wrapper {
        .block {
            width: 100%;
            display: block;
        }
        .form {
            width: 400px;
        }
        .left-item {
            text-align: left;
        }
        .submit {
            width: 100px;
        }
    }
</style>