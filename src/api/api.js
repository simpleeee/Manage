const serviceModule = {  
    login: {  //登录
      url: 'http://api.test.com/home/index/login',  
      method :'post'  
    },
    homeCharts: {  //首页图表
      url: 'http://api.test.com/home/index/homeCharts',  
      method :'post'  
    },
    ban: {  //冻结
      url: 'http://api.test.com/home/index/ban',  
      method :'post'  
    },   
    userCharts: {  //用户管理图表
      url: 'http://api.test.com/home/index/homeCharts',  
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
    getUserExamine:{ //获取用户审核列表
      url: 'http://api.test.com/home/index/getUserExamine',  
      method :'post'
    },

    ArenaCharts:{ //擂台管理图表
      url: 'http://api.test.com/home/index/ArenaCharts',  
      method :'post'
    },
    getArenaExamine:{ //获取话题待审核列表
      url: 'http://api.test.com/home/index/getArenaExamine',  
      method :'post'
    },
    getArenaBan:{ //获取话题禁止列表
      url: 'http://api.test.com/home/index/getArenaBan',  
      method :'post'
    },
    getArenaTopic:{ //获取话题列表
      url: 'http://api.test.com/home/index/getArenaTopic',  
      method :'post'
    },
    wulinCharts:{ //武林表单
      url: 'http://api.test.com/home/index/ArenaCharts',  
      method :'post'
    },
    getWulinList:{ //获取主题列表
      url: 'http://api.test.com/home/index/getArenaTopic',  
      method :'post'
    },
    getWulinBan:{ //获取主题禁止列表
      url: 'http://api.test.com/home/index/getArenaTopic',  
      method :'post'
    },
    fengyunCharts:{ //风云图表
      url: 'http://api.test.com/home/index/fengyunCharts',  
      method :'post'
    },
    getFengYunTag:{ //获取风云标签库
      url: 'http://api.test.com/home/index/getFengYunTag',  
      method :'post'
    },

    getUserInfo:{ //编辑用户&个人中心 拉取用户信息
      url: 'http://api.test.com/home/index/getUserInfo',  
      method :'post'
    }
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