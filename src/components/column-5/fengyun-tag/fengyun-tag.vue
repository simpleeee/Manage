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
                        <div @click="dialogFormVisible=true" class="btn-add">
                            <i class="el-icon-plus"></i> 添加新标签
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" :page="page" @childclick="childclick" @tableSet="tableSet" @handleCurrentChange="handleCurrentChange"></tablecontent>
        </el-main>
        <el-dialog title="新标签" :visible.sync="dialogFormVisible" center>
            <el-form :model="values" :rules="rules" ref="ruleForm">
                <el-form-item prop="name">
                    <el-input v-model="values.name" auto-complete="off" placeholder="请输入标签名称"></el-input>
                </el-form-item>
                <el-form-item prop="tag">
                    <el-input v-model="values.tag" auto-complete="off" placeholder="请输入关键字描述"></el-input>
                </el-form-item>
                <el-row>
                    <el-col :span="12">
                         <el-form-item label="分类">
                            <el-select v-model="values.class" @focus="getTagClass" placeholder="请选择分类">
                                <el-option v-for="(cl,index) in values.classList" :key="index" :label="cl.val" :value="cl.val"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item>
                            <el-input v-model="values.class" auto-complete="off" placeholder="输入新的分类"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <div class="block" style="text-align: center">
                    <el-button type="danger" @click="submitForm('ruleForm')">添加新标签</el-button>
                </div>
            </el-form>
        </el-dialog>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import tablecontent from "../../table/table"
    export default {
        data() {
            return {
                routerPath: '/fengyun-tag/', //账号列表
                loading: false,
                search: '',
                dialogFormVisible: false,
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
                    classStyle: 'pont'
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
                tableData: [],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
                values: {
                    name: '',
                    tag: '',
                    class:'其他',
                    classList:[
                      
                    ]
                },
                rules: {
                    name: [{
                        required: true,
                        message: '请输入标签名称',
                        trigger: 'blur'
                    }],
                    tag: [{
                        required: true,
                        message: '请输入关键字',
                        trigger: 'blur'
                    }]
                }
            }
        },
        methods: {
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '发起者') {
                    id = parseInt(data.row.userid);
                    this.$router.push({
                        path: '/user-info/' + id
                    })
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
            getTagClass(){//获取分类列表
                let op=[
                    {label:'生活',val:'生活'},
                    {label:'个人',val:'个人'},
                    {label:'其他',val:'其他'},
                ]
                setTimeout(() => {
                    this.values.classList=op;
                }, 300);
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                       this.dialogFormVisible=false;
                       alert('submit')
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
