<template>
<el-container class="adduser">
<el-header>
            <div class="upload-title"><span class="tword">图片库</span>
            <!-- <span class="plus"> <i class="el-icon-circle-plus"></i> </span> -->
            </div>
        </el-header>
    <el-main>

        <el-upload
            :action="uplodSet.action"
            list-type="picture-card"
            :multiple="true"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>

    </el-main>
</el-container>
</template>

<script type="text/ecmascript-6">
 export default {
 data() {
 return {
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[
            {
                 name: 'food.jpeg',
                 url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                 status: 'finished'
            }
        ],
        uplodSet:{
               action:'http://api.test.com/home/index/update',
            //    limit:3,
              },
 }

 },
 components: {

 },
 methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);//删除事件
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleSuccess(response, file, fileList){
        //   console.log(fileList.length)// 上传成功事件
      }
 }
 }
</script>

<style scoped lang="less">

</style>
