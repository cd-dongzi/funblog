<template>
    <article>
        <div class="search">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getMusicList"></el-input>
            <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getMusicList">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="musicList" tooltip-effect="dark" stripe border :default-sort="{prop: 'releaseTime', order: 'descending'}">
            <el-table-column type="index" width="55" align="center" header-align="center" :index="increment"></el-table-column>
            <el-table-column show-overflow-tooltip v-for="(item, index) in headerOptions" :key="index" :label="item.label" :prop="item.prop"
                v-if="!item.hidden && !item.tags" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"
                :min-width="item.minWidth || 150">
                <template slot-scope="scope">
                    <div v-if="scope.column.property == 'cover'">
                        <img :src="scope.row[scope.column.property]" alt="" class="cover">
                    </div>
                    <div v-else-if="scope.column.property == 'url'">
                        <audio controls>
                            <source :src="scope.row[scope.column.property]">
                            <source :src="scope.row[scope.column.property]">
                        </audio>
                    </div>
                    <div v-else-if="scope.column.property == 'isVisible'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                    <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] == 'null' ? '未知':parseTime(scope.row[scope.column.property],'{y}-{m}-{d}')}}</div>
                    <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
                </template>
            </el-table-column>
            <el-table-column v-else-if="item.tags" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"
                :min-width="item.minWidth || 300">
                <template slot-scope="scope">
                    <el-tag class="tag" type="primary" close-transition v-for="(tag, index) in scope.row.type" :key="index">{{tag}}</el-tag>
                </template>

            </el-table-column>
            <el-table-column label="操作" header-align="center" align="center" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageindex"
            :page-sizes="size_scoped" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="musicTotal">
        </el-pagination>
        <EditComponent v-if="editShow" :info="musicInfo" @close="editShow=false"></EditComponent>

    </article>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import {
        musicFilters
    } from '@/config/classify'
    import {
        parseTime
    } from 'src/filters'
    import EditComponent from '../edit/index'
    import Music from '@/api/music'
    export default {
        components: {
            EditComponent
        },
        data() {
            return {
                musicList: [],
                musicTotal: 0,

                keyword: '',
                editShow: false,
                musicInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 10,
                size_scoped: [10, 20, 30, 40],
                headerOptions: [{
                        label: '_id',
                        prop: '_id',
                        hidden: true,
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: '封面',
                        prop: 'cover',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: '歌名',
                        prop: 'name',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        sort: true
                    },
                    {
                        label: '作者',
                        prop: 'author',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        sort: true
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        tags: []
                    },
                    {
                        label: '级别',
                        prop: 'level',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '发布时间',
                        prop: 'releaseTime',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        sort: true
                    },
                    {
                        label: '歌曲链接',
                        prop: 'url',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        minWidth: 350
                    },
                    {
                        label: '歌曲描述',
                        prop: 'desc',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center'
                    },
                    {
                        label: '是否可见',
                        prop: 'isVisible',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        minWidth: '120'
                    }
                ],
                multipleSelection: []
            }
        },
        mounted() {
            this.getMusicList()
        },

        methods: {
            increment(index) {
                return index + 1 + ((this.pageindex - 1) * this.pagesize)
            },
            parseTime(time, format) {
                return parseTime(time, format)
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getMusicList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getMusicList()
            },
            async getMusicList() {
                this.loading = true;
                try {
                    const res = await Music.getMusicList({
                        keyword: this.keyword,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize,
                    })
                    console.log(res)
                    this.musicList = res.data.list
                    this.musicTotal = res.data.total
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            del(scope) {
                console.log(scope)
                // console.log(musicList)
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try {
                        await Music.delMusic(scope.row._id)
                        this.musicList.splice(scope.$index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } catch (e) {
                        this.$message.error(e)
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            edit(scope) {
                console.log(scope)
                this.editShow = true;
                // scope.row.type = scope.row.type[0].split(',');
                scope.row.releaseTime = new Date(scope.row.releaseTime)
                this.musicInfo = scope.row
            },
            filterTag(value, row) {
                return row.type.some(v => v === value)
            }
        }
    }
</script>

<style lang="less" scoped>
    article {
        padding: 20px;
        .search {
            padding-bottom: 20px;
            .el-input {
                width: 300px;
            }
        }
        .pagination {
            text-align: right;
            padding: 20px 0;
        }
        .cover {
            width: 50px;
        }
        .tag {
            margin: 0 10px;
        }
    }
</style>