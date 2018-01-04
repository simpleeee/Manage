<template>
    <el-container class="adduser system-res">
        <el-main>
            <el-tabs v-model="activeName">
                <!-- <el-tab-pane label="群发管理" name="first">
                    <el-form :inline="true" :model="send" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-row>
                            <el-col :span="18">
                                <el-form-item prop="text" class="not-inline">
                                    <el-input type="textarea" :rows="6" resize="none" placeholder="请输入群发内容" v-model="send.text"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="14">
                                <el-form-item prop="class" label="用户筛选">
                                    <el-select v-model="send.class">
                                        <el-option v-for="(option,i) in opt" :key="i" :label="option" :value="option"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="symbol">
                                    <el-select v-model="send.symbol">
                                        <el-option label="=" value="="></el-option>
                                        <el-option label=">" value=">"></el-option>
                                        <el-option label="<" value="<"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item prop="number">
                                    <el-input v-model.number="send.number"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="2" :offset="2">
                                <el-button type="danger" @click="submit('ruleForm')">发送</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                    <div class="table-box" v-loading="loading">
                        <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" :page="page" @handleCurrentChange="handleCurrentChange" @tableSet='tableSet' @childclick='childclick'></tablecontent>
                    </div>
                </el-tab-pane> -->
                <el-tab-pane label="问题反馈" name="second">
                     <el-date-picker v-model="value" @change='selectChange' value-format="yyyy-MM" format="yyyy-MM" :editable="false" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" unlink-panels> </el-date-picker>
                    <div class="table-box" v-loading="loading">
                          <tablecontent :tableData="tableData2" :tableHead="tableHead2" :tabSet="tabSet2" :page="page2" @handleCurrentChange="handleCurrentChange2" @tableSet='tableSet2' @childclick='childclick2'></tablecontent>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import table from '../../table/table'
    export default {
        data() {
            return {
                loading: false,
                activeName: 'second',
                value:'',
                send: {
                    text: '',
                    class: '等级',
                    symbol: '=',
                    number: ''
                },
                opt: ['等级', '视频数', '葱花粉', '辣椒币', '蒜泥狠', '举报数', '昵称'],
                rules: {
                    text: [{
                        required: true,
                        message: '请输入群发内容',
                        trigger: 'blur'
                    }],
                    number: [{
                            required: true,
                            message: '请输入条件值'
                        },
                        {
                            type: 'number',
                            message: '条件值必须为数字值'
                        }
                    ]
                },
                tabSet: [{
                    lable: '发送'
                }, {
                    lable: '拒绝',
                }],
                tabSet2: [{
                    lable: '回复'
                }],
                tableHead: [
                {
                    prop: 'id',
                    label: '账号ID',
                    width: '',
                }, {
                    prop: 'name',
                    label: '发送者',
                    width: '',
                    classStyle: 'pont'
                }, {
                    prop: 'juese',
                    label: '身份角色',
                    width: '',
                }, {
                    prop: 'content',
                    label: '发送内容',
                    width: '',
                    classStyle: 'pont'
                }, {
                    prop: 'to',
                    label: '送达用户群',
                    width: '',
                }, {
                    prop: 'createtime',
                    label: '申请时间',
                    width: '',
                }],
                tableData: [{
                    id: '99555',
                    name: '洞洞',
                    juese: '部门主管',
                    content: '哈哈哈哈哈哈哈哈哈',
                    to: '等级>20',
                    createtime: '11.01 12:33'
                }],
                tableHead2: [{
                    prop: 'headImg',
                    label: '头像',
                    width: '',
                    type:'img'
                }, {
                    prop: 'name',
                    label: '昵称',
                    width: '',
                    classStyle: 'pont'
                }, {
                    prop: 'id',
                    label: '账号ID',
                    width: '',
                }, {
                    prop: 'content',
                    label: '消息内容',
                    width: '',
                    classStyle: 'pont'
                }],

                tableData2: [{
                    id: '99555',
                    headImg: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                    name: '洞洞',
                    juese: '部门主管',
                    content: '哈哈哈哈哈哈哈哈哈',
                    to: '等级>20',
                    createtime: '11.01 12:33'
                }],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
                page2: {
                    pageContent: 2, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
            }
        },
        methods: {
            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('确定发送本条消息至用户群体？', '发送提示', {
                            confirmButtonText: '确认操作',
                            cancelButtonText: '我再想想',
                            type: 'warning'
                        }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '发送申请已提交，等待上级审核。'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    } else {
                        this.$message({
                            type: 'danger',
                            message: '请验证输入信息后提交！'
                        });
                        return false;
                    }
                })
            },
            handleCurrentChange(val) {//分页
                //  this.$router.push({
                //     path: this.routerPath + val + '/' + this.search
                // })
            },
            tableSet(data) { // 操作栏 
                let id = parseInt(data.id)
                let userid = data.row.id;
                switch (id) {
                    case 0:
                        alert('回复')
                        break;
                }
            },
            childclick(data) {
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '昵称') {
                    id = parseInt(data.row.id);
                    this.$router.push({
                        path: '/account-con/' + id + '/1'
                    })
                }
            },
            tableSet2(data) { // 操作栏 
                let id = parseInt(data.id)
                let userid = data.row.id;
                switch (id) {
                    case 0:
                        this.$prompt('请输入回复内容', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            inputPattern: /\S/,
                            inputErrorMessage: '请输入回复内容'
                            }).then(({ value }) => {
                            this.$message({
                                type: 'success',
                                message: '已回复'
                            });
                            }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消输入'
                            });       
                            });
                        break;
                }
            },
            childclick2(data) {
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '昵称') {
                    id = parseInt(data.row.id);
                    this.$router.push({
                        path: '/account-con/' + id + '/1'
                    })
                }
            },
            selectChange(date){

            },
            handleCurrentChange2(data) {
            },

            pageInit(data, callback, setting = this.$ApiSetting.getUser) { //获取信息
                this.loading = true;
                this.$http(setting, data).then(res => {
                    this.tableData = res.data.list;
                    this.loading = false;
                    callback(res.data);
                })
            }
        },
        components: {
            tablecontent: table
        },
        created(){
             //数据初始化
           
        },
        watch:{
            '$route' (to, form) {
                let page = parseInt(to.params.page);
                let search = to.params.search;
            }
        }
    }
</script>

<style lang="less">
    .system-res {
        .el-tabs__item:hover,
        .el-tabs__item.is-active {
            color: #eb3a11;
        }
        .el-tabs__active-bar {
            background-color: #eb3a11
        }
        .el-tabs__nav-wrap::after {
            height: 0;
        }
        .el-select {
            width: 100px
        }
        .not-inline {
            display: block;
            .el-form--inline .el-form-item,
            .el-form-item__content {
                display: block;
            }
        }
    }
</style>
