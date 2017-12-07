<template>
    <div class="addclass" v-show="isShow">
        <div class="content">
            <i class="el-icon-close btn-close" @click='showModal'></i>
            <div class="header">
                <h1>添加身份角色</h1>
            </div>
            <div class="con-body">
               <el-form :model="classVal" :rules="rules" ref="classVal" label-width="100px" class="demo-ruleForm">
                    <el-row>
                        <el-col :span="9">
                            <el-form-item label="身份角色" prop="userclass">
                                <el-input v-model="classVal.userclass"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="9">
                            <el-form-item label="上级角色" prop="leader">
                               <el-select v-model="classVal.leader"  placeholder="上级角色"  @focus="getuserleader">
                                    <el-option v-for="item in leader" :key="item.userclass" :label="item.userclass" :value="item.userclass"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                             <el-form-item label="权限" prop="type">
                                <el-checkbox-group v-model="classVal.type">
                                    <el-checkbox v-for="cheakbox in checkList" :key="cheakbox.label" :label="cheakbox.label" name="type" :disabled="cheakbox.disabled"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="24" style="text-align: center;">
                            <el-button type="danger"  @click="submit('classVal')">提交信息</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            var validateUserClass=(rule, value, callback)=>{
                setTimeout(() => {
                        // callback(new Error('角色已存在'));
                        callback();
                    }, 1000);
            };
            return {
                isShow:false,
                classVal:{
                    userclass:'',
                    leaderclass:'',
                    type:[],
                },
                leader:[
                     //  { value: "管理员",label: '管理员',userclass:'管理员'},
                ],
                checkList:[
                        {label:'帐号管理',disabled:false},
                        {label:'用户管理',disabled:false},
                        {label:'擂台管理',disabled:false},
                        {label:'武林管理',disabled:false},
                        {label:'风云管理',disabled:false},
                        {label:'系统管理',disabled:false},
                    ],
                rules:{
                    userclass:[
                        { required: true, message: '身份角色不能为空', trigger: 'blur' },
                        { validator: validateUserClass, trigger: 'blur' }
                    ],
                     leader:[
                        { required: true, message: '上级身份角色不能为空', trigger: 'change' },
                    ],
                    type:[
                        { type: 'array', required: true, message: '请选择权限', trigger: 'change' }
                    ]
                }
            }
        },
        methods:{
            submit(formName){
                this.$refs[formName].validate((valid) => {
                        if (valid) {
                            setTimeout(() => {          //验证通过 提交信息
                                 alert('submit!');
                                 console.log(this.classVal)  

                                this.showModal();//隐藏窗口
                            }, 1000);
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                        });
            },
            getuserleader(){//获取上级列表
                let userLeader=this.$store.state.userLeader;
    
                this.leader=userLeader;
                if(!userLeader.length){
                     this.$http(this.$ApiSetting.getLeader,{}).then(res=>{
                          this.leader=res.data; 
                          this.$store.commit('setLeader',res.data)   
                     })
                }
            },
            showModal(){
                this.isShow=!this.isShow;
            }
        }
    }
</script>

<style scoped lang="less">
    .addclass {
        position: fixed;
        z-index: 999999999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        .content{width: 800px;margin: 0 auto;position: relative;top: 25%;background: #fff;padding:30px;
        .btn-close{position: absolute;right: 10px;top: 10px;font-size: 20px;}
        .header{
            height: 40px;
            position: relative;
            h1{color: #EB3A11;text-align: center;line-height: 40px;}
            }
        }
    }
</style>
