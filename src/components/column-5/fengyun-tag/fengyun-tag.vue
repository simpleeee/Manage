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
                        <router-link to="" class="btn-add">
                            <i class="el-icon-plus"></i> 添加新表情
                        </router-link>
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
                routerPath: '/fengyun-tag/',//账号列表
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
                    prop: 'tagName',
                    label: '标签名称',
                    width: '',
                }, {
                    prop: 'keyword',
                    label: '关键字表述',
                    width: '',
                }, {
                    prop: 'user',
                    label: '发起者',
                    width: '',
                }, {
                    prop: 'target',
                    label: '适用目标',
                    width: '',
                }, {
                    prop: 'class',
                    label: '分类',
                    width: '',
                }, {
                    prop: 'state',
                    label: '状态',
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
                if (data.column.label == '发起者') {
                    id = parseInt(data.row.userid)
                }

            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                switch (id) {
                    case 0:
                    alert('通过')
                        break;
                    case 1:
                    alert('驳回')
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
            pageInit(data, callback, setting = this.$ApiSetting.getFengYunTag) { //获取信息
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
            //数据初始化
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
