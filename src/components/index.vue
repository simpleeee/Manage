<template>
  <div class="home">
    <el-container>
      <el-header class="header">
        <el-row :gutter="1">
        <el-col :span="18">
          <div class="grid-content bg-purple"><h1><span>Logo</span>姜葱蒜</h1></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-red">
            <div class="log-out" title="退出登录">【退出】</div>
            <div class="user-name">小小小小小葱</div>
            <div class="user-head" :style="'background-image:url('+headimg+')'" title="个人中心"></div>
          </div>
        </el-col>
</el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 导航菜单 -->
          <el-menu :default-active="$route.path" class="el-menu-vertical-demo nav-bar" @open="handleOpen" background-color="#363636" text-color="#@Scendcolor" active-text-color="#363636" :unique-opened='true' :default-openeds="open">

            <el-submenu v-for="(nav,index) in navs" :key="index" :index="index+''">
              <template slot="title">
                 <i class="iconfont" :class="nav.icon"></i>
                  <span>{{nav.title}}</span>
              </template>
                <el-menu-item-group>
                  <el-menu-item v-for="(child,index2) in nav.children" :key="index2" :index="child.url">
                    <i class="iconfont icon-you"></i>
                    <router-link :to="child.url" class="child-link">{{child.title}}</router-link>
                  </el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

 </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {mapState} from 'vuex';

  import headimg from "../assets/img/head.jpg"

  export default {
    name: 'app',
    data() {
      return {
        headimg:headimg,
        open:[''],
        navs:[
          {icon:"icon-tie",title:"账号管理",open:false,children:[
            {title:"账号列表",url:"/account"},
            {title:"冻结列表",url:"/account-ban"},
            {title:"身份权限",url:"/access"},
            ]
          },

          {icon:"icon-geren",title:"用户管理",children:[
            {title:"用户管理",url:"/users"},
            {title:"用户审核",url:"/user-examine"},
            {title:"冻结列表",url:"/user-ban"}
            ]
          },
          {icon:"icon-leitai",title:"擂台管理",children:[
            {title:"擂台管理",url:"/Arena"},
            {title:"待审列表",url:"/Arena-examine"},
            {title:"禁止列表",url:"/Arena-ban"},
            {title:"话题列表",url:"/Arena-speack"},
            {title:"视频审核",url:"/Arena-video"},]
          },
          {icon:"icon-wulindahui",title:"武林管理",children:[
            {title:"主题列表",url:"/wulin"},
            {title:"禁止列表",url:"/wulin-ban"},
            {title:"视频审核",url:"/wulin-video"}]
          },
          {icon:"icon-yun",title:"风云管理",children:[
            {title:"标签库",url:"/fengyun-tag"},
            {title:"视频审核",url:"/tag-examine"}]
          },
           {icon:"icon-xitong",title:"系统管理",url:"#",children:[
            {title:"标签库",url:"/system-tag"},
            {title:"系统设置",url:"/system-setting"},
            {title:"用户反馈",url:"/system-res"},
            {title:"举报管理",url:"/system-man"},
            {title:"图片库",url:"/system-img"},
            ]
          }
        ]
      }
    },
    computed: mapState(["userInfo"]),
    methods: {
      handleOpen(key, keyPath) {
        // localStorage.setItem("open",keyPath) //本地缓存菜单打开信息
      },
      logOut(){
        console.log('退出登录')
      },
      logState(){
        // let lo=JSON.parse(localStorage.getItem('userinfo'));
        //  if(!this.$store.state.userInfo.token&&!("token" in lo)){   //判断token是否存在
        //     this.$message({showClose: true, message: '登录异常，请重新登录！',type: 'warning'});
        //     this.$store.commit('userlogout');
        //     this.$router.push({path:'/login'});
        //  }
        if(this.$store.state.userInfo.token){
          return;
        }

        if(localStorage.getItem('userinfo')!=null&&localStorage.getItem('userinfo')!='undefined'){
          if(('token' in JSON.parse(localStorage.getItem('userinfo')))&&JSON.parse(localStorage.getItem('userinfo')).token!=''){
            return;
           }
           
          };
         this.$store.commit('userlogout');
         this.$message({showClose: true, message: '登录异常，请重新登录！',type: 'warning'});
         this.$router.push({path:'/login'});
      }
    },
    watch:{
      '$route'(to,from){
        this.logState();
      }
    },
    created(){
        this.logState();
    }
  }
</script>

<style scoped lang="less">
  @import url("../assets/css/public");
  .home,
  .el-container {
    .full;
  }
  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    background-color: rgba(54, 54, 54, 1);
    color: @Scendcolor;
    text-align: center;
    height: 100%
  }
  .nav-bar.el-menu{
    border: none;
    .el-submenu__title i,.el-submenu__title span{ color: @Scendcolor;};
    .child-link{.a-init;color: #fff;width: 100%;height: 100%;display: inline-block};
    .el-menu-item i{visibility: hidden;color: #fff}
    .el-menu-item.is-active i{visibility: visible}
  }
   
   .header{
   .grid-content{height: 60px};
   .bg-purple{background: #fff;
   span{color: @Scendcolor;margin-right: 15px}
   }
   .bg-red{display: flex;display: -webkit-flex;flex-flow: row;justify-content:flex-end;
       div{margin: 0 5px};
      .user-head{width: 50px;height: 50px;border-radius: 25px;background: #333;margin-top: 5px;background-position: center;background-size: cover;overflow: hidden;cursor: pointer};
      .log-out{color: @Scendcolor;cursor: pointer}
   }
   }
</style>
