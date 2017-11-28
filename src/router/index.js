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
      path:'/account',
      component:resolve=>require(['@/components/account/account'],resolve)
    },{
      path:'/home',
      component:resolve=>require(['@/components/home/home'],resolve)
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
