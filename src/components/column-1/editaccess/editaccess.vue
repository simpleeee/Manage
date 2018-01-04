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
                            <span>身份角色:</span>
                            <span>{{accessInfo.class}}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="info-text">
                            <el-checkbox-group v-model="accessInfo.cheacks">
                                <el-checkbox v-for="checkbox in checkList" :key="checkbox.label" :label="checkbox.label" :disabled="checkbox.disabled"></el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="20" style="text-align:right">
                        <el-button type="danger" @click="submit">保存更新</el-button>
                    </el-col>
                </el-row>
            </div>
            <div class="bottom">
                <tablecontent :tableData="tableData" :tableHead="tableHead"  :page="page" @childclick="childclick" @handleCurrentChange="handleCurrentChange"></tablecontent>
            </div>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
import tablecontent from '../../table/table'
    export default {
        data() {
            return {
                routerPath: '/editaccess/',//账号列表
                loading: false,
                title: [{
                    label: '身份角色列表',
                    to: '/access/1'
                }, {
                    label: '身份编辑'
                }],
                accessInfo: {
                    id: '2455852',
                    class: '部门主管',
                    cheacks: ['帐号管理', '风云管理', '用户管理', '用户管理']
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
                //  tabSet: [
                // ],
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
                    //  {
                    //   id: '1',
                    //   name: '王小虎',
                    //   juese:'部门主管',
                    //   creater:'小看',
                    //   createrid:'999',
                    //   createdate:'2017-10-10 12:10',
                    //   tel:'13588998899',
                    // },
                ],
                page: {
                    pageContent: 1, //总页数
                    currentPage: 1, //当前页
                    pageSize: 10 //每页条数
                },
            }
        },
        methods: {
            submit() {
                this.loading = true;
                setTimeout(() => {
                    this.loading = false;
                    this.$alert('更新成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'success',
                                message: `操作完成`
                            });
                        }
                    });
                }, 1000);
            },
            childclick(data) { // 单元格
                if (data.column.label === '操作') return;
                let id = 0;
                if (data.column.label == '创建者') {
                    id = parseInt(data.row.createrid)
                    this.$router.push({path: '/account-con/' + id+'/1'})
                }
                
            },
            tableSet(data) { // 操作栏 
               let id = parseInt(data.id)
                let userid = data.row.id;
                switch (id) {
                    case 0:
                        
                        this.$router.push({
                            path: '/adduser/' + userid
                        }); //编辑
                        break;
                    case 1:
            
                        this.$router.push({
                            path: '/edituser/' + userid
                        }); //修改权限
                        break;
                    case 2:
                        // console.log(data.row.id)
                        const h = this.$createElement;
                        let text = h('p', ['正在对 ', h('span', {
                            style: 'color: red'
                        }, data.row.name), ' 执行冻结操作，您确定吗']);
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
                                    message: '已冻结!'
                                });
                                this.tableData.splice(data.index, 1); //冻结
                            })
                        }).catch(() => {
                            //取消
                            this.$message({
                                type: 'error',
                                message: '已取消冻结'
                            });
                        });
                        break;
                }
            },
            handleCurrentChange(val) { //分页 
                let id=this.$route.params.id
                this.$router.push({
                    path: this.routerPath +id+'/'+val
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
            this.pageInit({id:id},res=>{})
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
