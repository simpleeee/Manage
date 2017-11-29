<template>
    <el-container class="account">
        <el-header>
            <el-row type="flex" justify="space-between">
                <el-col :span="3">
                    <div class="grid-content">
                         <el-input v-model="srarch" @keyup.enter.native="doSraech" placeholder="请输入内容" prefix-icon="el-icon-search"></el-input>
                    </div>
                </el-col>
               <el-col :span="3">
                    <div class="grid-content">
                         <router-link to="#" class="btn-add">
                             <i class="el-icon-plus"></i>
                             添加账号
                         </router-link>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" @childclick="childclick" @tableSet="tableSet" @handleCurrentChange="handleCurrentChange"></tablecontent>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
import tablecontent from "../table/table"
 export default {
 data() {
 return {
     srarch:'',
     tabSet:[
         {
             lable:'编辑',
         },
         {
             lable:'权限',
         },
         {
             lable:'冻结',
         }
     ],
     tableHead:[{
         prop:'id',
         label:'账号ID',
         width:'',
     },{
         prop:'name',
         label:'姓名',
         width:'',
     },{
         prop:'juese',
         label:'身份角色',
         width:'',
     },{
         prop:'creater',
         label:'创建者',
         width:'',
     },{
         prop:'createdate',
         label:'创建时间',
         width:'',
     },{
         prop:'tel',
         label:'联系电话',
         width:'',
     },
     ],
     tableData: [{
          id: '1',
          name: '王小虎',
          juese:'部门主管',
          creater:'小看',
          createrid:'999',
          createdate:'2017-10-10 12:10',
          tel:'13588998899',
         
        }]
 }

 },
 methods:{
     childclick(data){//操作栏 
        if(data.column.label==='操作') return;
        console.log(1);
     },
     tableSet(data){ //单元格 
        console.log(2);
     },
     handleCurrentChange(val){//分页 
         console.log(`当前页码:${val}`)
     },
     doSraech(){//搜索
        console.log('触发搜索')
     }
 },
 components: {
     tablecontent:tablecontent
 },
 }
</script>

<style scoped lang="less">
 @import url("../../assets/css/public");
.account{
    .el-header{background: #fff;margin-bottom:10px;
    .el-row{margin-top: 10px};
    .btn-add{display: block;width: 100%;height: 40px;line-height: 40px;background: @Scendcolor;text-align: center;.a-init;color: #fff;}
    }
    .el-main{background: #fff}
}
</style>
