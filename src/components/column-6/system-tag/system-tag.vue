<template>
    <el-container class="account" v-loading="loading">
        <el-header>
            <el-row type="flex" justify="space-between">
                <el-col :span="4">
                    <div class="grid-content search-add">
                        <el-input v-model="search" @keyup.enter.native="doSraech" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                         <!-- <router-link class="add-new" to=""><i class="el-icon-plus"></i></router-link> -->
                         <div class="add-new" @click="dialogFormVisible=true" title="添加新标签"><i class="el-icon-plus"></i></div>
                    </div>
                </el-col>
               <el-col :span="3">
                    <div class="grid-content">
                        <el-select v-model="value" placeholder="生活" @change="selectChange">
                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                        </el-select>
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
                routerPath: '/system-tag/', //标签库
                dialogFormVisible:false,
                loading: false,
                search: '',
                tabSet: false,
                tableHead: [{
                    prop: 'name',
                    label: '标签名称',
                    width: '',
                }, {
                    prop: 'keyword',
                    label: '关键字描述',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'creater',
                    label: '发起者',
                    width: '',
                    classStyle:'pont'
                }, {
                    prop: 'taget',
                    label: '适用目标',
                    width: ''
                }, {
                    prop: 'class',
                    label: '分类',
                    width: ''
                }, {
                    prop: 'state',
                    label: '状态',
                    width: ''
                },
                {
                    prop: 'set',
                    label: '操作',
                    width: '',
                    classStyle:'set'
                }
                ],
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
                }               //动态获取内容
                ],
                value:'',
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
                if (data.column.label === '操作'){    
                     let text='';
                     data.row.state!='正常'?text='恢复':text='停止';
                     this.$confirm(`正在${text}该标签的使用，您确定吗？`, '操作提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                            this.loading = true;
                            this.$http(this.$ApiSetting.ban, { banid: data.row.id }).then(res => { 
                                this.loading=false;
                                this.$message({ type: 'success', message: `已${text}使用` });
                                //刷新或者单独重新返回这条数据？
                              })
                        }).catch(() => {
                            //取消
                            this.$message({ type: 'error', message: `已取消${text}`});
                        });
                };

                let id = 0;
                if (data.column.label == '发起者') {
                    id = parseInt(data.row.userid)  //获取当前发起者ID
                    this.$router.push({path: '/user-info/'+id+'/user-video/leitai/1'})  
                }
                //  console.log(id)
                
            },
            tableSet(data) {  
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
            pageInit(data, callback, setting = this.$ApiSetting.getSystemTag ) { // ajax 获取信息  
                this.loading = true;
                this.$http(setting, data).then(res => {
                    this.tableData = res.data.list;
                    this.tableData.map((v,k)=>{
                        // console.log(v.set)
                        let set='限制';
                        if(v.state!='正常'){
                            set='使用';
                        }
                        v['set']=set;
                    })
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

            this.pageInit(data, res => {
                this.page.pageContent = parseInt(res.page.pageContent);
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
