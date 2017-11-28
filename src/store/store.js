import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions'
import getters from './getter'

Vue.use(Vuex);   //引用vuex

const state={
    userInfo:{
        id:0,
        level:0,//权限等级
        token:""
    },
};
const mutations={
    userlogin(state,value){
        state.userInfo=value;
        localStorage.setItem('userinfo',JSON.stringify(value));
    },
    userlogout(state){
        state.userInfo={
            id:0,
            level:0,//权限等级
            token:""
        }
        localStorage.setItem('userinfo',JSON.stringify(state.userInfo));
    }
};

export default new Vuex.Store({
// 导出整个demo模块
  state,
  getters,
  actions,
  mutations
})