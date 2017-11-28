const serviceModule = {  
    login: {  
      url: 'http://api.test.com/home/index/login',  
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