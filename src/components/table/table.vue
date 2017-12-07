<template>
<div class="tab-content">
<el-table :data="tableData" stripe style="width: 100%" @cell-click="cellClick" :cell-class-name="cellClassName">
                <el-table-column v-for="(head,index) in tableHead" :key="index" :prop="head.prop" :label="head.label" :width="head.width" :show-overflow-tooltip="true"></el-table-column>

                <el-table-column fixed="right" label="操作"  v-if="isSet">
                        <template slot-scope="scope">
                            <el-button v-for="(tab,index) in tabSet" :key="index" @click="deleteRow(scope.$index, scope.row,index)" type="text" size="small">{{tab.lable}}</el-button>
                        </template>
                </el-table-column>    
</el-table>
    
 <div class="block" style="text-align: center;margin-top:30px">
  <el-pagination @current-change="handleCurrentChange" :current-page.sync="page.currentPage" :page-size="page.pageSize" layout="total, prev, pager, next,jumper" :page-count="page.pageContent"> </el-pagination>
</div>
</div>

</template>
<script type="text/ecmascript-6">
 export default {
 props:['tableData','tableHead','tabSet','page'],    
 data() {
 return {
    currentPage: 1,
    isSet:this.tabSet,
 }

 },
 methods:{
      cellClassName({row, column, rowIndex, columnIndex}){
        try{
          return this.tableHead[columnIndex].classStyle;
        }catch(err){
          return '';
        }
      
      },
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

<style>
.pont{cursor: pointer}
</style>
