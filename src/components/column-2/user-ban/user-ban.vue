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
                        <el-select v-model="value" placeholder="等级" @change="selectChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
                        </div>
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
                routerPath: '/user-ban/',//身份权限
                loading: false,
                search: '',
                tabSet: [{
                        lable: '解封',
                    }
                ],

                tableHead: [{
                    prop: 'id',
                    label: '账号id',
                    width: '',
                }, {
                    prop: 'name',
                    label: '昵称',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'userlevel',
                    label: '用户等级',
                    width: '',
                }, {
                    prop: 'fans',
                    label: '葱花粉',
                    width: '',
                    classStyle:'red'
                }, {
                    prop: 'money',
                    label: '辣椒币',
                    width: '',
                    classStyle:'red'
                }, {
                    prop: 'rnb',
                    label: '消费总额',
                    width: '',
                    classStyle:'red'
                },{
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
                options: [{
                    value: '等级',
                    label: '等级'
                    }, {
                    value: '葱花粉',
                    label: '葱花粉'
                    }, {
                    value: '辣椒币',
                    label: '辣椒币'
                    }, {
                    value: '消费额',
                    label: '消费额'
                    }, {
                    value: '蒜泥狠',
                    label: '蒜泥狠'
                  }],
        value: '等级'
            }
        },
        methods: {
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '昵称') {
                    id = parseInt(data.row.id)
                }
                console.log(data.column)
                
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                switch (id) {
                    case 0:
                        let accessid = data.row.id;
                         const h = this.$createElement;
                        let text = h('p', ['该账户因 ', h('span', {
                            style: 'color: red'
                        }, data.row.name), ' 原因被冻结，您确定要进行解冻操作吗？']);
                        this.$confirm(text, '操作提示', {
                            confirmButtonText: '确认操作',
                            cancelButtonText: '我再想想',
                            type: 'warning'
                        }).then(() => {
                            //确认
                            this.$store.state.fullscreenLoading = true;
                            this.$http(this.$ApiSetting.ban, {
                                banid: data.row.id
                            }).then(res => {
                                //  只有成功状态码回到这里！！  不成功的可以再server.js进行拦截！！
                                this.$store.state.fullscreenLoading = false;
                                this.$message({type: 'success',message: '解冻成功，账号已恢复平台登录功能!'});
                                this.tableData.splice(data.index, 1); //冻结
                            })
                        }).catch(() => {
                            //取消
                            this.$message({
                                type: 'error',
                                message: '已取消操作'
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
            selectChange(){ //排序变更
                let data = {
                    search: this.search,
                    page: 1,
                    value:this.value
                }
                this.pageInit(data,res=>{});
                console.log(this.value)
            },
            pageInit(data, callback, setting = this.$ApiSetting.getUserExamine) { // ajax获取信息
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
    .redx{color: red}
</style>
