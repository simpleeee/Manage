<template>
    <el-container class="account">
        <el-header>Header</el-header>
        <el-main>
            <tablecontent :tableData="tableData" :tableHead="tableHead" :tabSet="tabSet" @childclick="childclick" @tableSet="tableSet"></tablecontent>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
import tablecontent from "../table/table"
 export default {
 data() {
 return {
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
     childclick(data){
        if(data.column.label==='操作') return;
        console.log(1);
     },
     tableSet(data){
        console.log(2);
     }
 },
 components: {
     tablecontent:tablecontent
 },
 }
</script>

<style scoped lang="less">
.account{
    .el-header{background: #fff}
    .el-main{background: #fff}
}
</style>
