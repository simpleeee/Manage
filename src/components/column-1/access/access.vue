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
                    <div class="grid-content">
                            <div class="btn-add" @click="showMoadl">
                                <i class="el-icon-plus"></i> 添加身份角色
                            </div>
                        </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" :page="page" @childclick="childclick" @tableSet="tableSet" @handleCurrentChange="handleCurrentChange"></tablecontent>
        </el-main>
         <addclass ref="addclass"></addclass>
    </el-container>
   
</template>

<script type="text/ecmascript-6">
    import tablecontent from "../../table/table"
    import addclass from "../addclass/addclass"
    export default {
        data() {
            return {
                routerPath: '/access/',//身份权限
                loading: false,
                search: '',
                tabSet: [{
                        lable: '编辑权限',
                    }
                ],
                tableHead: [{
                    prop: 'juese',
                    label: '身份角色',
                    width: '',
                }, {
                    prop: 'creater',
                    label: '创建者',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'leaderclass',
                    label: '创建者身份',
                    width: '',
                }, {
                    prop: 'createdate',
                    label: '创建时间',
                    width: '',
                }, {
                    prop: 'usernum',
                    label: '使用人数',
                    width: '',
                }, {
                    prop: 'list',
                    label: '名单',
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
                if (data.column.label == '创建者') {
                    id = parseInt(data.row.createrid)
                    this.$router.push({path: '/account-con/' + id+'/1'})
                }
                // if (data.column.label == '创建者身份') {
                //     id = parseInt(data.row.createrid)
                //     this.$router.push({path: '/editaccess/' + id+'/1'})
                // }
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                switch (id) {
                    case 0:
                        let accessid = data.row.id;
                        this.$router.push({
                            path: '/editaccess/' + accessid
                        }); //编辑
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
            showMoadl(){   //操控子组件显示
                this.$refs.addclass.showModal();
            },
            pageInit(data, callback, setting = this.$ApiSetting.getAccess) { // ajax获取信息
                this.loading = true;
                this.$http(setting, data).then(res => {
                    this.tableData = res.data.list;
                    this.loading = false;
                    callback(res.data);
                })
            }
        },
        components: {
            tablecontent: tablecontent,
            addclass:addclass
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

            this.$store.state.fullscreenLoading=false;
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
