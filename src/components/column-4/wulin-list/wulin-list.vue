<template>
    <el-container class="account" v-loading="loading">
        <el-header>
            <el-row type="flex" justify="space-between">
                <el-col :span="4">
                    <div class="grid-content search-add">
                        <el-input v-model="search" @keyup.enter.native="doSraech" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                         <router-link class="add-new" to=""><i class="el-icon-plus"></i></router-link>
                    </div>
                </el-col>
               <el-col :span="3">
                    <div class="grid-content">
                        <el-select v-model="value" placeholder="时间" @change="selectChange">
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
                routerPath: '/wulin-list/', //禁止列表
                loading: false,
                search: '',
                tabSet: [{
                        lable: '限制',
                    },
                    {
                        lable: '置顶',
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
                }, {
                    prop: 'juese',
                    label: '身份角色',
                    width: ''
                }, {
                    prop: 'createtime',
                    label: '发起时间',
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
                options: [{
                    value: '时间',
                    label: '时间'
                },{
                    value: '意见数',
                    label: '意见数'
                },{
                    value: '浏览数',
                    label: '浏览数'
                },
                {
                    value: '消费数',
                    label: '消费数'
                }
                ],
                value:''
            }
        },
        methods: {
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '发起者') {
                    id = parseInt(data.row.userid)  //获取当前发起者ID
                   
                }else if(data.column.label == '话题内容'){
                    id = parseInt(data.row.id)  //获取当前发起者ID
                }
                 console.log(id)
                
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                let accessid = data.row.id;
                switch (id) {
                    case 0: //限制
                    this.loading=true;
                    this.pageInit(data,res=>{
                                this.loading=false;
                                this.$message({type: 'success',message: '已提交操作'});
                                this.tableData.splice(data.index, 1); //通过移出当前数据
                            })
                    break;
                    case 1://置顶
                     alert('置顶')
                    break;
                }
            },
            handleCurrentChange(val) { //分页 

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
            selectChange() { //触发 下拉框
                // let data = {
                //     search: this.search,
                //     page: 1,
                //     value:this.value
                // }
                // this.pageInit(data,res=>{});
                console.log(this.value)
            },
            pageInit(data, callback, setting = this.$ApiSetting.getArenaTopic ) { // ajax 获取信息  
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
    .redx {
        color: red
    }
    .textc {
        text-align: center;
        line-height: 40px
    }
    .account .el-header .el-row.sc-row {
        margin-top: 0
    }
</style>
