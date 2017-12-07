<template>
<el-container class="adduser" v-loading="loading">
  <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
            <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
  </el-header>
  <el-main>
      <el-row>
           <el-col :span="24">
               <el-form :model="value" :rules="rules" ref="value" label-width="100px" class="ruleForm">
                <el-row>
                    <el-col :span="12">
                        <div class="input-box">

                            <el-form-item label="账号身份" prop="class">
                                <el-select v-model="value.class" placeholder="账号身份" @focus="getAccc" :disabled="disable.edit">
                                  <el-option v-for="item in restaurants" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-button type="danger" class="add-new-class" v-show="!disable.edit" @click="showMoadl">新身份</el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box">
                            <el-form-item label="账号ID">
                                <el-input v-model="value.id" placeholder="系统默认创建" disabled></el-input>
                            </el-form-item>
                            
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="input-box">

                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="value.name" placeholder="请输入姓名" :disabled="disable.single"></el-input>
                            </el-form-item>
                            
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box">
                             <el-form-item label="密码">
                                 <el-input v-model="value.passwd" type="password" placeholder="系统默认创建" disabled></el-input>
                             </el-form-item>
                             <el-button type="warning" class="add-new-class" v-show="resetPW" @click="resetPassWord">重置</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="input-box">

                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="value.sex">
                                    <el-radio label="男" :disabled="disable.single"></el-radio>
                                    <el-radio label="女" :disabled="disable.single"></el-radio>
                                </el-radio-group>
                             </el-form-item>
                                
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box">
                             <el-form-item label="直接上级">
                                <el-select v-model="value.leader"  placeholder="默认创建人，点击可选择"  @focus="getuserleader" @change='changeLeader' :disabled="disable.edit">
                                    <el-option v-for="item in leader" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>

                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <div class="input-box">
                           <el-form-item label="联系方式" prop="tel">
                                <el-input v-model="value.tel" placeholder="请输入员工联系电话" :maxlength="11"></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="input-box">
                            <el-form-item label="上级身份">
                                 <el-input v-model="value.leaderclass" placeholder="根据选择填充" disabled></el-input>
                            </el-form-item>
                        </div>
                    </el-col>
                </el-row>

               
               <el-row>
                   <el-col :span="24" style="text-align: center;">
                       <el-button type="danger" :loading="isBtn.loading" v-show="isBtn.show" @click="submit('value')">提交信息</el-button>
                   </el-col>
               </el-row>
            </el-form>
            </el-col>
      </el-row>
  </el-main>
  <addclass ref="addclass"></addclass>
</el-container>
</template>

<script type="text/ecmascript-6">
 import addclass from "../addclass/addclass"
    export default {
        components:{
            addclass:addclass
        },
        data() {
            return {
                loading:false,
                resetPW:false,
                disable:{
                    single:false,
                    edit:false
                },
                isBtn:{show:true,loading:false},
                title:[
                    {label:'账号列表',to:'/account/1'},
                    {label:'帐号编辑'}
                ],
                value:{
                    class:'',
                    id:'',
                    name:'',
                    passwd:'******',
                    sex:'男',
                    leader:'',
                    tel:'',
                    leaderclass:'',
                },
                restaurants:[
                    //  { value: "管理员",label: '管理员'},
                ],
                leader:[
                     //  { value: "洞洞",label: '洞洞',userclass:'管理员'},
                ],

                 rules: {
                        class:[
                           { required: true, message: '请选择账号身份', trigger: 'change' }
                        ],
                        name:[
                            { required: true, message: '姓名不能为空', trigger: 'blur' },
                            { min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur' }
                        ],
                        sex:[
                            { required: true, message: '请选择性别', trigger: 'change' }
                        ],
                        tel:[
                            {required:true,message:'请输入手机号',trigger:'blur'},
                            {pattern:/^1[34578]\d{9}$/,message:'请输入正确的中国大陆手机号'}
                        ]
                        },
            }
        },
        methods:{
            submit(formName){//提交修改
                //  this.loading=true;
                //  this.$http(this.$ApiSetting.getUserInfo,this.value).then(res=>{
                //           this.loading=false;
                //      })
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            alert('submit!');
                            console.log(this.value)
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                        });
            },
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
                this.disable.single=false;
                this.disable.edit=false;
                let i=this.$route.params.id;
                this.isBtn.show=true;
                this.resetPW=false;

                if(i==0){           // 参数为0 显示个人中心
                    this.isBtn.show=false;
                    this.title=[
                    {label:'首页',to:'/home'},
                    {label:'个人中心'}
                    ]
                    this.disable.single=true;
                    this.disable.edit=true;
                    this.getUserInfo(this.$store.state.userInfo.id);//拉取个人信息
                }else if(i=='add'){ // 参数为add 显示添加账号
                    this.title=[
                        {label:'账号列表',to:'/account/1'},
                        {label:'添加账号'}
                    ]
                }else{
                    this.resetPW=true;
                    this.disable.single=true;
                    this.getUserInfo(i);//拉取信息
                }
                console.log(i)
            // 其他 修改账号
            },
            showMoadl(){   //操控子组件显示
                this.$refs.addclass.showModal();
            },
            getUserInfo(data){
                //  this.$store.state.fullscreenLoading = true;
                this.loading=true;
                this.$http(this.$ApiSetting.getUserInfo,data).then(res=>{
                          this.value=res.data;
                          this.loading=false;
                     })
            },
            resetPassWord(){
                this.$message({type: 'success',message: `密码已重置`});
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

<style lang="less">
.adduser{
   .el-input.el-input--suffix{
       width: 100%;
   }
}
</style>
