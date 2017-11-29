<template>
<div class="tab-content">
<el-table :data="tableData" stripe style="width: 100%" @cell-click="cellClick">
                <el-table-column v-for="(head,index) in tableHead" :key="index" :prop="head.prop" :label="head.label" :width="head.width"></el-table-column>
                <el-table-column fixed="right" label="操作" width="">
                        <template slot-scope="scope">
                            <el-button v-for="(tab,index) in tabSet" :key="index" @click="deleteRow(scope.$index, scope.row,index)" type="text" size="small">{{tab.lable}}</el-button>
                        </template>
                </el-table-column>    
</el-table>
    
 <div class="block" style="text-align: center;margin-top:30px">
  <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="total, prev, pager, next,jumper"
      :total="1000"
      >
    </el-pagination>
</div>
</div>

</template>
<script type="text/ecmascript-6">
 export default {
 props:['tableData','tableHead','tabSet'],    
 data() {
 return {
currentPage: 1,
 }

 },
 methods:{
     deleteRow(index,row,id){//操作栏事件
       let msg={index:index,row:row,id:id}
       this.$emit('tableSet',msg);
     },
     cellClick(row, column, cell,event){//单元格点击事件
        let msg={row:row,column:column,cell:cell}
        this.$emit('childclick',msg);
     },
     handleCurrentChange(val) {
       this.$emit('handleCurrentChange',val);
      }
 },
 components: {

 }
 }
</script>

<style scoped lang="">

 
</style>
