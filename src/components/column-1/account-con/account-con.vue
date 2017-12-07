<template>
    <el-container class="adduser" v-loading="loading">
        <el-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
                <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-header>
        <el-main>
            <div class="top">
                <el-row>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>姓名:</span>
                            <span>{{accessInfo.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>账号ID:</span>
                            <span>{{accessInfo.id}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>直接上级:</span>
                            <span>{{accessInfo.leader}}</span>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>账号身份:</span>
                            <span>{{accessInfo.class}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>联系方式:</span>
                            <span>{{accessInfo.tel}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>上级身份:</span>
                            <span>{{accessInfo.leaderclass}}</span>
                        </div>
                    </el-col>
                </el-row>

                 <el-row>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>性别:</span>
                            <span>{{accessInfo.sex}}</span>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="info-text">
                            <span>权限:</span>
                            <span>{{accessInfo.access}}</span>
                        </div>
                    </el-col>
                </el-row>

            </div>
            <div class="bottom">
                <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" :page="page" @handleCurrentChange="handleCurrentChange"></tablecontent>
            </div>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import tablecontent from '../../table/table'
    export default {
        data() {
            return {
                routerPath: '/editaccess/', //账号列表
                loading: false,
                title: [{
                    label: '账号列表',
                    to: '/account/1'
                }, {
                    label: '账号详情'
                }],
                accessInfo: {
                    id: '2455852',
                    name:'洞洞',
                    leader:'小看',
                    class: '部门主管',
                    tel:'13568252255',
                    leaderclass:'管理员',
                    sex:'男',
                    access:'帐号管理,帐号管理',
                },
                checkList: [{
                        label: '帐号管理',
                        disabled: false
                    },
                    {
                        label: '用户管理',
                        disabled: false
                    },
                    {
                        label: '用户管理',
                        disabled: false
                    },
                    {
                        label: '武林管理',
                        disabled: false
                    },
                    {
                        label: '风云管理',
                        disabled: false
                    },
                    {
                        label: '系统管理',
                        disabled: false
                    },
                ],
                tabSet: false,
                tableHead: [{
                    prop: 'record',
                    label: '操作记录',
                    width: '',
                }, {
                    prop: 'recordtime',
                    label: '操作时间',
                    width: '',
                }],
                tableData: [{
                    record: '擂台模块-待审列表-审核通过  89条',
                    recordtime: '2017.11.01 12：33'
                }, ],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
            }
        },
        methods: {
            handleCurrentChange(val) { //分页 
                let id = this.$route.params.id
                this.$router.push({
                    path: this.routerPath + id + '/' + val
                })
            },
            pageInit(data, callback, setting = this.$ApiSetting.getUser) { // 获取当前身份账号列表
                this.loading = true;
                this.$http(setting, data).then(res => {
                    this.tableData = res.data.list;
                    this.loading = false;
                    callback(res.data);
                })
            }
        },
        created() {
            let id = this.$route.params.id; //获取id
            // this.pageInit({id:id},res=>{})
            // this.loading=true;   //初始化用户信息
            //             this.$http(this.$ApiSetting.getUserAccess,{id:id}).then(res=>{
            //             this.accessInfo=res.data.accessInfo;
            //             this.checkList=res.data.checkList;
            //             this.loading=false;
            // })
        },
        components: {
            tablecontent: tablecontent,
        },
    }
</script>

<style scoped lang="less">
    .info-text {
        height: 60px;
        line-height: 60px;
    }
</style>
