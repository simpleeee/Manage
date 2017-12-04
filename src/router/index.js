import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'

Vue.use(Router)

const routes=[{
  path:'/',
  component:index,
  redirect:"/home",
  children:[
    {
    //首页
      path:'/home',
      component:resolve=>require(['@/components/home/home'],resolve)
    },
    {
      //账号列表
      path:'/account/:page?/:search?',
      component:resolve=>require(['@/components/column-1/account/account'],resolve)
    },
    {
        //添加账户
        path:'/adduser/:id',
        component:resolve=>require(['@/components/column-1/adduser/adduser'],resolve)
      },
     
    {    //冻结列表    
        path:'/account-ban/:page?/:search?',
        component:resolve=>require(['@/components/column-1/account-ban/account-ban'],resolve)
      },

      {    //身份权限    
        path:'/access/:page?/:search?',
        component:resolve=>require(['@/components/column-1/access/access'],resolve)
      },
      {
         //用户统计信息
        path:'/users',
        component:resolve=>require(['@/components/column-2/users/users'],resolve)
      },
      {
        //用户审核
       path:'/user-examine/:page?/:search?',
       component:resolve=>require(['@/components/column-2/user-examine/user-examine'],resolve)
     },
      {
        //用户冻结
       path:'/user-ban/:page?/:search?',
       component:resolve=>require(['@/components/column-2/user-ban/user-ban'],resolve)
     },
  ]
  },
  {
    path:'/login',
    component:resolve=>require(['@/components/login/login'],resolve)
  },
  
]
export default new Router({
  routes
});
