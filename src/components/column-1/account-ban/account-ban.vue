<template>
    <el-container class="account" v-loading="loading">
        <el-header>
            <el-row type="flex" justify="space-between">
                <el-col :span="3">
                    <div class="grid-content">
                        <el-input v-model="search" @keyup.enter.native="doSraech" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                    </div>
                </el-col>
                <el-col :span="3">
                    <!-- <div class="grid-content">
                            <router-link to="/adduser/add" class="btn-add">
                                <i class="el-icon-plus"></i> 添加账号
                            </router-link>
                        </div> -->
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" :page="page" @childclick="childclick" @tableSet="tableSet" @handleCurrentChange="handleCurrentChange"></tablecontent>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import tablecontent from "../../table/table"
    export default {
        data() {
            return {
                routerPath: '/account-ban/',//冻结列表
                loading: false,
                search: '',
                tabSet: [
                    {
                        lable: '恢复',
                    }
                ],
                tableHead: [{
                    prop: 'id',
                    label: '账号ID',
                    width: '',
                }, {
                    prop: 'name',
                    label: '姓名',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'juese',
                    label: '身份角色',
                    width: '',
                }, {
                    prop: 'creater',
                    label: '创建者',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'createdate',
                    label: '创建时间',
                    width: '',
                }, {
                    prop: 'tel',
                    label: '联系电话',
                    width: '',
                }, ],
                tableData: [
                ],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
            }
        },
        methods: {
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '姓名') {
                    id = parseInt(data.row.id);
                    this.$router.push({path: '/account-con/' + id+'/1'})
                } else if (data.column.label == '创建者') {
                    id = parseInt(data.row.createrid);
                    this.$router.push({path: '/account-con/' + id+'/1'})
                }        
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                 let userid = data.row.id;
                switch (id) {
                    case 0:
                        const h = this.$createElement;
                        let text = h('p', ['正在对 ', h('span', {
                            style: 'color: red'
                        }, data.row.name), ' 执行恢复操作，您确定吗']);
                        this.$confirm(text, '操作提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            //确认
                            this.$store.state.fullscreenLoading = true;
                            this.$http(this.$ApiSetting.ban, {
                                banid: data.row.id
                            }).then(res => {
                                //  只有成功状态码回到这里！！  不成功的可以再server.js进行拦截！！
                                this.$store.state.fullscreenLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '已恢复!'
                                });
                                this.tableData.splice(data.index, 1); //冻结
                            })
                        }).catch(() => {
                            //取消
                            this.$message({
                                type: 'error',
                                message: '已取消恢复'
                            });
                        });
                        break;
                }
            },
            handleCurrentChange(val) { //分页 
                // console.log(`当前页码:${val}`)
                this.$router.push({
                    path: this.routerPath + val + '/' + this.search
                })
            },
            doSraech() { //搜索
                // console.log('触发搜索');
                let data = {
                    search: this.search,
                    page: 1
                }
                this.$router.push({
                    path: this.routerPath + 1 + '/' + this.search
                })
            },
            pageInit(data, callback, setting = this.$ApiSetting.getBanUser) { // ajax获取信息
                this.loading = true;
                this.$http(setting, data).then(res => {
                    this.tableData = res.data.list;
                    this.loading = false;
                    callback(res.data);
                })
            }
        },
        components: {
            tablecontent: tablecontent
        },
        created() {
            //数据初始化 根据路由参数获取页面信息
            this.page.currentPage = parseInt(this.$route.params.page);
            // console.log(this.$route.params.page)
            if (this.$route.params.page == undefined) {
                this.page.currentPage = 1;
            }
            let search = '';
            if (this.$route.params.search) {
                search = this.$route.params.search;
                this.search = search;
            }
            let data = {
                search: search,
                page: this.page.currentPage
            }
            //    console.log(data)
            this.pageInit(data, res => {
                this.page.pageContent = parseInt(res.page.pageContent);
                // console.log('数据初始化')
            });
        },
        watch: {
            '$route' (to, form) {
                let page = parseInt(to.params.page);
                let search = to.params.search;
                this.pageInit({
                    page: page,
                    search: search
                }, res => {})
            }
        }
    }
</script>

<style scoped lang="less">

</style>
