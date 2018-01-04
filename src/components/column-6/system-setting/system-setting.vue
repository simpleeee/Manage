<template>
    <el-container class="adduser">
        <el-header>
            <div class="upload-title"><span class="tword">轮播图设置</span><span class="plus"><i class="el-icon-circle-plus" @click="addSwiper"></i></span></div>
        </el-header>
        <el-main>
            <el-row :gutter="40">
                <el-col :span="10">
                    <el-upload class="upload-demo" :action="uplodSet.action" :on-preview="handlePreview" :on-remove="handleRemove" multiple :limit="uplodSet.limit" :on-exceed="handleExceed" :file-list="fileList" :onError="uploadError" :onSuccess="uploadSuccess" name="importfile">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，当前还可上传{{uplodSet.limit-count}}张</div>
                    </el-upload>
                </el-col>
                <el-col :span="12">
                    <!-- 轮播 -->
                    <div class="swiper">
                        <el-carousel height="300px">
                            <el-carousel-item v-for="(item,index) in swiper" :key="index">
                                <div class="swiper-item" :style="{backgroundImage:`url(${item.src})`}"></div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    
                </el-col>
            </el-row>
        </el-main>
        <!-- <el-header>
            <div class="upload-title gray"><span class="tword">数据设置</span></div>
        </el-header>
        <el-main>
            <el-form :model="values" :rules="rules" ref="ruleForm" label-width="100px">
            <el-row class="system-set" :gutter="10">
                <el-col :span="6">
                    <el-form-item label="提现折算率:" prop="rnb">
                        <el-input  v-model.number="values.rnb"    placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12" class="red">{{values.rnb}} 辣椒币 = 80 RNB</el-col>
            </el-row>

            <el-row :gutter="10">
                        <el-col :span="5">
                            <el-form-item label="发布操作+ " prop="release">
                                <el-input  v-model.number="values.release"  ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="互动操作+ " prop="interaction">
                                <el-input  v-model.number="values.interaction"  ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="充值操作+ " prop="recharge">
                                <el-input  v-model.number="values.recharge"  ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="签到+ " prop="sign">
                                <el-input   v-model.number="values.sign"  ></el-input>
                            </el-form-item>
                        </el-col>
            </el-row>
            <div class="block" style="text-align:center;margin-top:30px">
                 <el-button type="danger" @click="submit('ruleForm')">确定保存</el-button>
            </div>
            </el-form>
        </el-main> -->
    </el-container>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                swiper:[
                    {src:'http://xiu.weilot.com/Uploads/pic/33/201712/5a26433d1a607.jpg'},
                    {src:'http://xiu.weilot.com/Uploads/pic/33/201712/5a2df762a44f7.jpg'},
                    {src:'http://xiu.weilot.com/Uploads/pic/33/201712/5a2df768c0aea.jpg'},
                    {src:'http://xiu.weilot.com/Uploads/pic/33/201712/5a2df7681f08d.jpg'},
                ],
                fileList: [
                   
                ],
                count:0,
                uplodSet:{
                    action:'http://api.test.com/home/index/update',
                    limit:3,
                },
                values:{
                    rnb:1000,
                    release:100,
                    interaction:100,
                    recharge:100,
                    sign:100,
                },
                rules:{
                    rnb:[
                            {required:true,message: '请输入折算率'},
                            { type: 'number', message: '数值必须为数字值'}
                    ],
                    release:[
                            { required: true, message: '请输入数值'},
                            { type: 'number', message: '数值必须为数字值'}
                    ],
                    interaction:[
                            { required: true, message: '请输入数值'},
                            { type: 'number', message: '数值必须为数字值'}
                    ],
                    recharge:[
                             { required: true, message: '请输入数值'},
                             { type: 'number', message: '数值必须为数字值'}
                    ],
                    sign:[
                            { required: true, message: '请输入数值'},
                            { type: 'number', message: '数值必须为数字值'}
                    ],
                }
            }
        },
        methods:{
            //上传图片使用的elementui自带上传插件，如果有问题我重新写个。
             handleRemove(file, fileList) {
                alert('删除图片')
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择${this.uplodSet.limit}个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            uploadSuccess (response, file, fileList) {
                this.count+=1;
                console.log('上传文件', response);
            },
            // 上传错误
            uploadError (response, file, fileList) {
             console.log('上传失败，请重试！')
            },
            addSwiper(){
                this.uplodSet.limit+=1;
            },
            submit(formeName){
                // console.log(this.values);
                this.$refs[formeName].validate((valid) => {
                if (valid) {
                   this.$confirm('正在对系统数据进行修改，您确定吗？', '提示', { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }).then(() => {
                        this.$message({ type: 'success', message: '恭喜您，修改完毕!' });
                        }).catch(() => {
                        this.$message({ type: 'info', message: '已取消修改' });          
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
                
            }
        },
        created(){
            this.count=this.fileList.length;
        }
    }
</script>

<style lang="less">
    .swiper{width: 80%;border: 1px solid #ddd;}
    .swiper-item{background-position: top;background-size: cover;background-repeat: no-repeat;width: 100%;height: 100%}
    .upload-demo{.el-upload-list{    overflow: auto;
    height: 220px;}}
    .gray{color: gray;
    span.tword{border-color: gray}
    }
    .system-set{line-height: 40px}
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none !important;
        margin: 0;
    }
</style>
