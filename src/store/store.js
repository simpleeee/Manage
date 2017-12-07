import Vue from 'vue';
import Vuex from 'vuex';

import actions from './actions'
import getters from './getter'

Vue.use(Vuex);   //引用vuex

const state={
    fullscreenLoading:false,
    userInfo:{
        id:0,
        level:0,//权限等级
        token:""
    },
    userClass:[

    ],
    userLeader:[]
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
    },
    setuserclass(state,value){
        state.userClass=value;  
    },
    setLeader(state,value){
        state.userLeader=value;  
    },
    addNewLeader(state,value){
        state.userLeader.push(value)
    }
};

export default new Vuex.Store({
// 导出整个demo模块
  state,
  getters,
  actions,
  mutations
})