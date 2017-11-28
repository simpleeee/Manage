import axios from "axios"
import qs from "qs"
import { Message } from 'element-ui';
// import Vuex from 'vuex';
// import store from '../store/store.js';
// import Router from 'vue-router'
/**
 * 请求拦截
 */
axios.interceptors.request.use(config=>{
    //请求前处理
        // if(store.state.userInfo.token||JSON.parse(localStorage.getItem('userinfo')).token){   //判断token是否存在
            
        //     config.headers.Authorization = `token ${JSON.parse(localStorage.getItem('userinfo')).token}`;
        //  }
         return config;
},error=>{
    return Promise.reject(error)
})
/**
 * 响应拦截
 */
axios.interceptors.response.use(response=>{
     // 返回响应时做一些处理
    return response 
},error=>{
    // if (error.response) {
    //     switch (error.response.status) {
    //         case '0002':
    //             // 清除token信息并跳转到登录页面
    //             store.commit('userlogout');//清除登录信息
    //             router.replace({
    //                 path: '/login'
    //             })
    //     }
    // }
    return Promise.resolve(error.response)  
})



function errorState(response) {  
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {  
      return response  
    }else{  
         Message({
            showClose: true,
            message: '网络异常,请刷新后重试',
            type: 'error'
          });
     //错误提示
    }  
      
  }
  
  function successState(res) {  
    // //统一判断后端返回的错误码  
    switch(res.data.errCode){
        case '001':
        console.log('001');
        break;
        default:return "请求出错";
    } 
        
    
    
  }  


  const httpServer = (opts, data) => {  
    
    //   let Public = { //公共参数  
    //     'srAppid': ""  
    //   }  
    
      let httpDefaultOpts = { //http默认配置  
            method:opts.method,  //请求方式
            // baseURL,  
            url: opts.url,  //地址
            timeout: 10000, //超时
            responseType: "json",  //返回格式
            params:Object.assign(data),  
            data:qs.stringify(data),  
            headers: opts.method=='get'?{  
              'X-Requested-With': 'XMLHttpRequest',  
              "Accept": "application/json",  
              "Content-Type": "application/json; charset=UTF-8"  
            }:{  
              'X-Requested-With': 'XMLHttpRequest',  
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
            }  
      }  
    
      if(opts.method=='get'){  
        delete httpDefaultOpts.data  
      }else{  
        delete httpDefaultOpts.params  
      }  
        
// 将异常部分直接封装到业务调用的 then 方法中 例如：
      let promise = new Promise(function(resolve, reject) {  
        axios(httpDefaultOpts).then(  
          (res) => {  
            successState(res)  
            resolve(res)  
          }  
        ).catch(  
          (response) => {  
            errorState(response)  
            reject(response)  
          }  
        )  
    
      })  
    return promise  
  }  
    
  export default httpServer  