<template>
<article>
    <div class="search">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="keyword" @keydown.enter.native="getFriendList"></el-input>
        <el-button type="primary" icon="el-icon-search" :loading="loading" @click="getFriendList">搜索</el-button>
    </div>
    <el-table ref="multipleTable" :data="friendList" tooltip-effect="dark" stripe border>
        <el-table-column type="index" width="55" align="center" header-align="center"></el-table-column>

        <el-table-column show-overflow-tooltip v-if="!item.hidden" v-for="(item, index) in headerOptions" :key="index" :label="item.label" :prop="item.prop" :header-align="item.headerAlign" :align="item.align" :sortable="item.sort"  :min-width="item.minWidth || 150">
            <template slot-scope="scope">
                <div v-if="scope.column.property == 'isVisible'">{{scope.row[scope.column.property]?'是':'否'}}</div>
                <div v-else-if="scope.column.property == 'releaseTime'">{{scope.row[scope.column.property] | parseTime('{y}-{m}-{d}')}}</div>
                <div v-else>{{scope.row[scope.column.property]}}</div>
            </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="center" width="250">
            <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageindex"
      :page-sizes="size_scoped"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="friendTotal">
    </el-pagination>
    <EditComponent v-if="editShow" :info="friendInfo" @close="close"></EditComponent>

</article>
</template>
<script>
    import { mapGetters } from 'vuex'
    import EditComponent from '../edit/index'
    import { blogFilters } from '@/config/classify'
    export default {
        components: {
            EditComponent
        },
        data() {
            return {
                keyword: '',
                editShow: false,
                friendInfo: {},
                loading: false,
                pageindex: 1,
                pagesize: 10,
                size_scoped: [10, 20, 30, 40],
                headerOptions: [
                    {
                        label: '_id',
                        prop: '_id',
                        hidden: true,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '头像',
                        prop: 'avatar',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: ''
                    },
                    {
                        label: '姓名',
                        prop: 'name',
                        hidden: false,
                        headerAlign: 'center',
                        align: 'center',
                        width: '',
                        sort: true                  
                    },
                    {
                        label: '邮箱',
                        prop: 'email',
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
        mounted () {
            this.getFriendList()
        },

        methods: {
            close () {
                this.editShow = false;
                this.getFriendList()
            },
            handleSizeChange(val) {
                // console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.getFriendList()
            },
            handleCurrentChange(val) {
                // console.log(`当前页: ${val}`);
                this.pageindex = val;
                this.getFriendList()
            },
            async getFriendList () {
                this.loading = true;
                try {
                    await this.$store.dispatch('getFriendList', {
                        keyword: this.keyword,
                        pageindex: this.pageindex,
                        pagesize: this.pagesize
                    })
                    this.loading = false;
                }catch(e) {
                    this.loading = false;
                }
            },
            del (scope) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      center: true
                    }).then(async () => {
                        try {
                                await this.$store.dispatch('delFriend', scope.row._id)
                                this.friendList.splice(scope.$index, 1)
                            }catch(e) {

                            }
                          this.$message({
                            type: 'success',
                            message: '删除成功!'
                          });
                        }).catch(() => {
                          this.$message({
                            type: 'info',
                            message: '已取消删除'
                          });
                        });
                
            },
            edit (scope) {
                this.editShow = true;
                scope.row.releaseTime = new Date(scope.row.releaseTime)
                this.friendInfo = scope.row
            },
            filterTag(value, row) {
                return row.type.some( v => v === value)
            }
        },
        computed: {
            ...mapGetters([
                'friendList',
                'friendTotal'
            ])
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
