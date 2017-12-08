<template>
    <el-container class="account" v-loading="loading">
        <el-header>
            <el-row type="flex" justify="space-between">
                <el-col :span="4">
                    <div class="grid-content search-add">
                        <el-input v-model="search" @keyup.enter.native="doSraech" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                        <div class="add-new" @click="addNewtag"><i class="el-icon-plus"></i></div>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content">
                        <el-date-picker v-model="value" @change='selectChange' value-format="yyyy-MM" format="yyyy-MM" :editable="false" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" unlink-panels> </el-date-picker>
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
                routerPath: '/Arena-examine/', //待审列表
                loading: false,
                search: '',
                tabSet: [{
                        lable: '通过',
                    },
                    {
                        lable: '驳回',
                    }
                ],
                tableHead: [{
                    prop: 'id',
                    label: '话题ID',
                    width: '',
                }, {
                    prop: 'content',
                    label: '话题内容',
                    width: '',
                }, {
                    prop: 'name',
                    label: '发起者',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'juese',
                    label: '身份角色',
                    width: ''
                }, {
                    prop: 'createtime',
                    label: '申请时间',
                    width: ''
                }, {
                    prop: 'state',
                    label: '状态',
                    width: ''
                }],
                tableData: [
                ],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
                value: '',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
            }
        },
        methods: {
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '发起者') {
                    id = parseInt(data.row.userid)  //获取当前发起者ID
                    this.$router.push({path: '/user-info/'+id+'/user-video/leitai/1'})  
                }

                
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                let accessid = data.row.id;
                switch (id) {
                    case 0: //通过

                    break;
                    case 1:  //驳回
                      this.$prompt('驳回原因', '', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPattern: /\S/,
                            inputErrorMessage: '请输入驳回原因',
                        }).then(({value}) => {
                             let data = {
                                 id:accessid,//当前行id
                                 value:value
                             }
                            this.loading=true;
                            this.pageInit(data,res=>{
                                this.loading=false;
                                this.$message({type: 'success',message: '已驳回'});
                                this.tableData.splice(data.index, 1); //驳回移出当前数据
                            })
                            
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消操作'
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
            selectChange(val) { //时间选择
                 let data = {
                    search: this.search, 
                    startDate: val[0],
                    endDate: val[1],
                    page: 1,
                };
                // this.pageInit(data,res=>{});
                // console.log(this.value)
            },
            addNewtag(){
                 this.$prompt('话题发起', '', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        inputPattern: /\S/,
                        inputErrorMessage: '请输入话题内容'
                        }).then(({ value }) => {
                            //点击确认操作
                        this.$message({ type: 'success', message: '发起成功: ' });

                        }).catch(() => {

                        this.$message({ type: 'info',  message: '取消输入' });       

                        });
            },
            pageInit(data, callback, setting = this.$ApiSetting.getArenaExamine) { // ajax获取信息
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

<style lang="less">

</style>
