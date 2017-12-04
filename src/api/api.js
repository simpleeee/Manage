const serviceModule = {  
    login: {  //登录
      url: 'http://api.test.com/home/index/login',  
      method :'post'  
    },
    ban: {  //冻结
      url: 'http://api.test.com/home/index/ban',  
      method :'post'  
    },   
    getUser: {  //获取用户 分页 搜索
      url: 'http://api.test.com/home/index/getUser',  
      method :'post'  
    },
    getAccc:{  //获取权限
      url: 'http://api.test.com/home/index/getAccc',  
      method :'post'
    },
    getLeader:{ //获取领导
      url: 'http://api.test.com/home/index/getLeader',  
      method :'post'
    },
    getBanUser:{ //获取冻结列表
      url: 'http://api.test.com/home/index/getBanUser',  
      method :'post'
    },
    getAccess:{ //获取身份权限列表
      url: 'http://api.test.com/home/index/getAccess',  
      method :'post'
    },
    getUserExamine:{ //获取身份权限列表
      url: 'http://api.test.com/home/index/getUserExamine',  
      method :'post'
    },
  }  
const ApiSetting = {...serviceModule }  
    
export default ApiSetting 

/**
 * 调用
 *  http(apiSetting.getProjects).then(
 *          res = >{
 *               this.$store.commit("loadProject", res.data.data);
 *           },
 *            error = >{
 *                console.log(error);
 *            })
 */