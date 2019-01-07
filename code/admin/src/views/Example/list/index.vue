<template>
    <article>
        <div class="search">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getExampleList"></el-input>
            <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getExampleList">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="exampleList" tooltip-effect="dark" stripe border>
            <el-table-column type="index" width="55" align="center" header-align="center" :index="increment"></el-table-column>

            <el-table-column show-overflow-tooltip v-if="!item.hidden && !item.filters" v-for="(item, index) in headerOptions" :key="index"
                :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"
                :min-width="item.minWidth || 150">
                <template slot-scope="scope">
                    <div v-if="scope.column.property == 'isVisible'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                    <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] | parseTime('{y}-{m}-{d}')}}</div>
                    <div v-else-if="scope.column.property == 'url'">
                        <a :href="scope.row[scope.column.property]" target="_blank" :alt="scope.row[scope.column.property]">查看演示</a>
                    </div>
                    <div v-else>{{scope.row[scope.column.property] || '无'}}</div>
                </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip v-else-if="!item.hidden && item.filters" :key="index" :label="item.label" :prop="item.prop"
                :header-align="item.headerAlign" :align="item.align" :sortable="item.sort" :filters="item.filters" :filter-method="filterTag"
                :min-width="item.minWidth || 200">
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
            :page-sizes="size_scoped" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="exampleTotal">
        </el-pagination>
        <EditComponent v-if="editShow" :info="exampleInfo" @close="close"></EditComponent>

    </article>
</template>
<script>
    import {
        mapGetters
    } from 'vuex'
    import EditComponent from '../edit/index'
    import {
        sources,
        blogFilters
    } from '@/config/classify'
    import Example from '@/api/example'
    export default {
        components: {
            EditComponent
        },
        data() {
            return {
                exampleList: [],
                exampleTotal: 0,
                sources,
                keyword: '',
                editShow: false,
                exampleInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 10,
                size_scoped: [10, 20, 30, 40],
                headerOptions: [{
                        label: '_id',
                        prop: '_id',
                        hidden: true,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '类型',
                        prop: 'type',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        filters: blogFilters
                    },
                    {
                        label: '文件名',
                        prop: 'name',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '实例名',
                        prop: 'title',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '文件类型',
                        prop: 'filetype',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true
                    },
                    {
                        label: '链接',
                        prop: 'url',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
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
                        label: '描述',
                        prop: 'desc',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: 'GitHub',
                        prop: 'github',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '是否可见',
                        prop: 'isVisible',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        minWidth: 120
                    }
                ]
            }
        },
        mounted() {
            this.getExampleList()
        },

        methods: {
            increment(index) {
                return index + 1 + ((this.pageindex - 1) * this.pagesize)
            },
            close() {
                this.editShow = false;
                this.getExampleList()
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getExampleList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getExampleList()
            },
            async getExampleList() {
                this.loading = true;
                try {
                    const res = await Example.getExampleList({
                        keyword: this.keyword,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.exampleList = res.data.list
                    this.exampleTotal = res.data.total
                    this.loading = false;
                } catch (e) {
                    this.loading = false;
                }
            },
            del(scope) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(async () => {
                    try {
                        // await this.$store.dispatch('delExample', scope.row._id)
                        await Example.delExample(scope.row._id)
                        this.exampleList.splice(scope.$index, 1)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    } catch (e) {

                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            edit(scope) {
                this.editShow = true;
                scope.row.releaseTime = new Date(scope.row.releaseTime)
                this.exampleInfo = scope.row
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
        .tag {
            margin: 0 10px;
        }
    }
</style>
