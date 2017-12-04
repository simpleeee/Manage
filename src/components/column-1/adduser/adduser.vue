<template>
<el-container class="adduser">
  <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
            <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
  </el-header>
  <el-main>
      <el-row>
           <el-col :span="16">
               <el-row>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select01">账号身份</label>
                          <el-select v-model="value.class" id="select01" placeholder="请选择账号身份" @focus="getAccc">
                                  <el-option v-for="item in restaurants" :key="item.value" :label="item.label" :value="item.value"></el-option>
                           </el-select>
                       </div>
                   </el-col>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select02">账号ID</label>
                           <el-input v-model="value.id" placeholder="系统默认创建" disabled></el-input>
                       </div>
                   </el-col>
               </el-row>
               <el-row>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select03">姓名</label>
                           <el-input v-model="value.name" placeholder="请输入姓名"></el-input>
                       </div>
                   </el-col>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select04">密码</label>
                           <el-input v-model="value.passwd" type="password" placeholder="系统默认创建" disabled></el-input>
                       </div>
                   </el-col>
               </el-row>
               <el-row>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select05">性别</label>
                            <el-radio v-model="value.sex" label="1">男</el-radio>
                            <el-radio v-model="value.sex" label="2">女</el-radio>
                       </div>
                   </el-col>
                   <el-col :span="12">
                       <div class="input-box">
                            <label for="select06">直接上级</label>
                            <el-select v-model="value.leader"  placeholder="默认创建人，点击可选择"  @focus="getuserleader" @change='changeLeader'>
                                  <el-option v-for="item in leader" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                       </div>
                   </el-col>
               </el-row>
               <el-row>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select07">联系方式</label>
                           <el-input v-model="value.tel" placeholder="请输入员工联系电话" :maxlength="11"></el-input>
                       </div>
                   </el-col>
                   <el-col :span="12">
                       <div class="input-box">
                           <label for="select08">上级身份</label>
                           <el-input v-model="value.leaderclass" placeholder="根据选择填充" disabled></el-input>
                       </div>
                   </el-col>
               </el-row>
               <el-row>
                   <el-col>
                       <el-button type="primary" :loading="isBtn.loading" v-show="isBtn.show">提交</el-button>
                   </el-col>
               </el-row>
            </el-col>
      </el-row>
  </el-main>
</el-container>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                isBtn:{show:true,loading:false},
                title:[
                    {label:'账号列表',to:'/account/1'},
                    {label:'帐号编辑'}
                ],
                value:{
                    class:'部门经理',
                    id:'9527',
                    name:'洞洞',
                    passwd:'123456',
                    sex:'1',
                    leader:'洞洞',
                    tel:'13577777777',
                    leaderclass:'管理员',
                },
                restaurants:[
                    //  { value: "管理员",label: '管理员'},
                ],
                leader:[
                     //  { value: "洞洞",label: '洞洞',userclass:'管理员'},
                ]
            }
        },
        methods:{
            getAccc(){//获取身份列表
                let userClass=this.$store.state.userClass;
                this.restaurants=userClass;
                if(!userClass.length){
                     this.$http(this.$ApiSetting.getAccc,{}).then(res=>{
                          this.restaurants=res.data; 
                          this.$store.commit('setuserclass',res.data)   
                     })
                }
                
            },
            getuserleader(){//获取上级列表
                let userLeader=this.$store.state.userLeader;
                // console.log(userLeader);
                this.leader=userLeader;
                if(!userLeader.length){
                     this.$http(this.$ApiSetting.getLeader,{}).then(res=>{
                          this.leader=res.data; 
                          this.$store.commit('setLeader',res.data)   
                     })
                }
            },
            changeLeader(val){
                this.value.leaderclass=this.leader[val].userclass;
                },
            routerChange(){
                let i=parseInt(this.$route.params.id);
                this.isBtn.show=true;
                if(i==0){           // 参数为0 显示个人中心
                    this.isBtn.show=false;
                    this.title=[
                    {label:'首页',to:'/home'},
                    {label:'个人中心'}
                    ]
                }else if(i=='add'){ // 参数为0 显示添加账号
                    this.title=[
                        {label:'账号列表',to:'/account/1'},
                        {label:'添加账号'}
                    ]
                }
            // 其他 修改账号
            }

        },
        watch:{
           '$route'(to,from){
               this.routerChange();
           }
        },
        created(){
            this.routerChange();
        }
    }
</script>

<style scoped lang="less">
 @import url("../../../assets/css/public");
.adduser{
    .el-header,.el-main{background: #fff}
    .el-header .title{line-height: 60px;
    .el-breadcrumb__inner{cursor: pointer}
    }
    .input-box{
        display: table;
        width: 80%;
        margin-bottom: 20px;
        label{width: 100px}
        .el-select{width: 100%}
        label,input{display: table-cell}
    }
}
</style>
