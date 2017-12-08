import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

const routes = [{
    path: '/',
    component: index,
    redirect: "/home",
    children: [{
        //首页
        path: '/home',
        component: resolve => require(['@/components/home/home'], resolve)
      },
/**
  * 账号管理
  */     
      {
        //账号列表
        path: '/account/:page?/:search?',
        component: resolve => require(['@/components/column-1/account/account'], resolve)
      },
      {
        //添加账户
        path: '/adduser/:id',
        component: resolve => require(['@/components/column-1/adduser/adduser'], resolve)
      },

      { //冻结列表    
        path: '/account-ban/:page?/:search?',
        component: resolve => require(['@/components/column-1/account-ban/account-ban'], resolve)
      },

      { //身份权限    
        path: '/access/:page?/:search?',
        component: resolve => require(['@/components/column-1/access/access'], resolve)
      },
      { //账户权限修改
        path: '/edituser/:id',
        component: resolve => require(['@/components/column-1/edituser/edituser'], resolve)
      },
      { //身份角色修改
        path: '/editaccess/:id/:page?',
        component: resolve => require(['@/components/column-1/editaccess/editaccess'], resolve)
      },
      { //账号详情
        path: '/account-con/:id/:page?',
        component: resolve => require(['@/components/column-1/account-con/account-con'], resolve)
      },

  /**
    * 用户管理
    */
      {
        //用户统计信息
        path: '/user',
        component: resolve => require(['@/components/column-2/users/users'], resolve)
      },
      {
        //用户审核
        path: '/user-examine/:page?/:search?',
        component: resolve => require(['@/components/column-2/user-examine/user-examine'], resolve)
      },
      {
        //用户冻结
        path: '/user-ban/:page?/:search?',
        component: resolve => require(['@/components/column-2/user-ban/user-ban'], resolve)
      },
      {
        //用户信息
        path: '/user-info/:id',
        component: resolve => require(['@/components/column-2/user-info/user-info'], resolve),
        children:[
          {
            path:'user-video/:tag?/:page?',
            component: resolve => require(['@/components/column-2/user-video/user-video'], resolve),
          },
          {
            path:'user-pay/:tag?',
            component: resolve => require(['@/components/column-2/user-pay/user-pay'], resolve),
          }
        ]
      },
      {
        //视频分析
        path: '/analysis/:id',
        component: resolve => require(['@/components/column-2/analysis/analysis'], resolve)
      },

  /**
   * 擂台管理
   */
      {
        //擂台管理
        path: '/Arena',
        component: resolve => require(['@/components/column-3/Arena/Arena'], resolve)
      },
      {
        //话题待审列表
        path: '/Arena-examine/:page?/:search?',
        component: resolve => require(['@/components/column-3/Arena-examine/Arena-examine'], resolve)
      },
      {
        //话题禁止列表
        path: '/Arena-ban/:page?/:search?',
        component: resolve => require(['@/components/column-3/Arena-ban/Arena-ban'], resolve)
      },
      {
        //话题列表
        path: '/Arena-topic/:page?/:search?',
        component: resolve => require(['@/components/column-3/Arena-topic/Arena-topic'], resolve)
      },
      {
        //话题详情
        path: '/Arena-info/:block/:id',
        component: resolve => require(['@/components/column-3/Arena-info/Arena-info'], resolve),
        children:[
          {
            path:'Arena-video-topic/:tag?/:page?',
            component: resolve => require(['@/components/column-3/Arena-video-topic/Arena-video-topic'], resolve),
          },
        ]
      },
      {
        //视频审核
        path: '/Arena-video/:block/:tag/:page?',
        component: resolve => require(['@/components/column-3/Arena-video/Arena-video'], resolve)
      },
  /**
   * 武林管理
   */  
      {        
        //武林
        path: '/wulin',
        component: resolve => require(['@/components/column-4/wulin/wulin'], resolve)
      },
      {
        //武林列表
        path: '/wulin-list/:page?/:search?',
        component: resolve => require(['@/components/column-4/wulin-list/wulin-list'], resolve)
      },
      {
        //武林禁止列表
        path: '/wulin-ban/:page?/:search?',
        component: resolve => require(['@/components/column-4/wulin-ban/wulin-ban'], resolve)
      },
      {
        //风云管理
        path: '/fengyun',
        component: resolve => require(['@/components/column-5/fengyun/fengyun'], resolve)
      },
      {
        //风云标签库
        path: '/fengyun-tag/:page?/:search?',
        component: resolve => require(['@/components/column-5/fengyun-tag/fengyun-tag'], resolve)
      },
    ]
  },
  {
    path: '/login',
    component: resolve => require(['@/components/login/login'], resolve)
  },

]
export default new Router({
  routes
});

