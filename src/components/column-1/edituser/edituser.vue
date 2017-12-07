<template>
<el-container class="adduser" v-loading="loading">
  <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
            <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
  </el-header>
    <el-main>
        <el-row>
            <el-col :span="8">
                <div class="info-text">
                     <span>账号ID:</span>
                     <span>{{accessInfo.id}}</span>
                </div>
                
            </el-col>
            <el-col :span="8">
                <div class="info-text">
                     <span>姓名:</span>
                     <span>{{accessInfo.name}}</span>
                </div>
            </el-col>
        </el-row>
        <el-row>
             <el-col :span="8">
                 <div class="info-text">
                     <span>身份角色:</span>
                     <span>{{accessInfo.class}}</span>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="info-text">
                     <span>创建者:</span>
                     <span>{{accessInfo.creator}}</span>
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
            <el-col :span="24" style="text-aligin:center">
                <el-button type="danger" @click="submit">保存更新</el-button>
            </el-col>
        </el-row>
    </el-main>
</el-container>
</template>

<script type="text/ecmascript-6">
 export default {
 data() {
 return {
        loading:false,
        title:[{label:'账号列表',to:'/account/1'},{label:'权限修改'}],
        accessInfo:{
            id:'2455852',
            name:'洞洞',
            class:'管理员',
            creator:'小看',
            cheacks:['帐号管理','风云管理']
        },
        checkList:[
            {label:'帐号管理',disabled:false},
            {label:'用户管理',disabled:false},
            {label:'擂台管理',disabled:false},
            {label:'武林管理',disabled:false},
            {label:'风云管理',disabled:false},
            {label:'系统管理',disabled:false},
        ]
 }

 },
 methods:{
     submit(){
         this.loading=true;
         setTimeout(() => {
             this.loading=false;
             this.$alert('更新成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$message({type: 'success',message: `操作完成`});
                }
                });
         }, 1000);
     }
 },
 created(){
    let id=this.$route.params.id;//获取id
    // this.loading=true;   //初始化用户信息
    //             this.$http(this.$ApiSetting.getUserAccess,{id:id}).then(res=>{
    //             this.accessInfo=res.data.accessInfo;
    //             this.checkList=res.data.checkList;
    //             this.loading=false;
    // })
 }
 }
</script>

<style scoped lang="less">
.info-text{height: 60px;line-height: 60px;

}
</style>
