<template>
 <el-container>
     <div class="login-content">
            <el-row :gutter="1">
            <el-col :span="10" class="logo"><div class="grid-content bg-purple">
                    <h1 class="logo-text">Logo<br>姜葱蒜</h1>

                </div></el-col>
            <el-col :span="14" class="user-info">
                <div class="grid-content bg-purple">
                    <h1>管理中心</h1>
                    <div class="input-box">
                        <div class="in-p">
                        <el-input placeholder="账号" v-model="info.name">
                            <template slot="prepend"><i class="iconfont icon-geren"></i></template>
                        </el-input>
                        </div>
                        <div class="in-p">
                        <el-input placeholder="密码" v-model="info.passwd">
                            <template slot="prepend"><i class="el-icon-warning"></i></template>
                        </el-input>
                        </div>
                    </div>
                    <div class="btn-box">
                        <el-button type="warning" class="btn-submit" :loading="btnType.loading"  @click="login">登录</el-button>
                    </div>
                    
                    <!-- <div class="btn btn-submit" @click="login">登录></div> -->
                </div>
            </el-col>
            </el-row>
     </div>
 </el-container>
</template>

<script type="text/ecmascript-6">
 import {mapActions} from 'vuex'

// import http from "../../api/server"
// import ApiSetting from "../../api/api"

 export default {
 data() {
 return {
     info:{name:'',passwd:''},
     btnType:{loading:false}
 }

 },
 methods:{
     login(){
         if(this.info.name==''||this.info.passwd==''){
             this.$message({
                    showClose: true,
                    message: '账号密码不能为空',
                    type: 'warning'
                    });
             return;
         }
         this.btnType.loading=true;
         this.$http(this.$ApiSetting.login,this.info).then(res=>{

            this.$store.commit('userlogin',res.data);
            this.$message({showClose: true, message: '登录成功',type: 'success'});
            this.$router.push({path:'/home'});

        })
     }
 },
 watch:{
 }
 }
</script>

<style scoped lang="less">
@import url('../../assets/css/public');
.el-container{width: 100%;height: 100%;background:rgba(40, 40, 40, 1);min-width: 640px;

.login-content{position: absolute;top: 20%;left: 50%;margin-left: -250px;background: #fff;width: 500px;padding: 30px;border-radius: 4px;
.logo,.user-info{height: 300px}
.logo-text{color: @Scendcolor;text-align: center;line-height: 2em;font-size: 2.5em;margin-top: 1em}
.user-info{
    h1{color: @Scendcolor;text-align: center}
    .input-box{margin-top: 4em;position: relative;padding:0 0 30px 0;
    div.in-p{margin-top: 15px}
    }
}
.btn-box{margin: 10px auto 0 auto;width: 50%;text-align: center;
    .btn-submit{width: 100%;background: @Scendcolor;border-color: @Scendcolor;}
    .btn-submit:active{background:darken(@Scendcolor,-10%);border-color: darken(@Scendcolor,-10%);}
}

}
.toast{position: absolute;width: 100%}

}

</style>
