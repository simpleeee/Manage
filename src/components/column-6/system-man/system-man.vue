<template>
    <el-container class="adduser" v-loading='loading'>
        <el-header>
            <div class="tabs-title">
                <ul class="tabs-title-ul">
                    <li v-for="(tab,index) in nav" :key="index" :class="{active:tab.active}" @click='changeList(index,tab)'>{{tab.title}}</li>
                </ul>
            </div>
        </el-header>
        <el-main>
            <div class="tag-list">
                <ul class="tag-list-ul">
                    <li v-for="(tag,index) in tags" :key="index" :class="{active:tag.active}" @click='changeList(index,tag)'>{{tag.title}}</li>
                </ul>
            </div>
            <div class="video-list">
                <ul>
                    <ul class="video-card">
                        <li v-for="(video,index) in videos" :key="index">
                         <span class="timess ov_1" style="right:10px:font-size:12px">共{{video.time}}次</span>   
                         <i class="jinzhi" :class="modalConf.class? 'el-icon-circle-check-outline':'el-icon-remove-outline'" @click="dialogVisible=true,choseVideo=video.id"></i>
                        <div class="jubao-reason">
                            <span class="ov_3" :title="video.reason">{{video.reason}}</span>
                            <span class="jbr ov_1">举报人:{{video.name}}</span>
                        </div>
                            <router-link to="#"><img :src="video.img" alt=""></router-link>
                        </li>
                    </ul>
                </ul>
                <div class="block" v-show="page.pageContent>1">
                    <el-pagination @current-change="handleCurrentChange" :current-page.sync="page.currentPage" :page-size="page.pageSize" layout="total, prev, pager, next,jumper" :page-count="page.pageContent"> </el-pagination>
                </div>
            </div>
        </el-main>
        <el-dialog :title="modalConf.class?'解冻视频':'限制视频'" :visible.sync="dialogVisible" width="30%">
            <div class="dialog-con">
                <div v-if="modalConf.class">该视频因 <span class="red">{{modalConf.resource}}</span> 原因被限制，您确定对其进行解封操作吗？</div>
                <el-form ref="form" :model="value" v-if="!modalConf.class">
                    <span>选择限制原因：（读取原因数据）</span>
                    <el-form-item>
                        <el-radio-group v-model="value.resource">
                            <el-radio label="内容不良"></el-radio>
                            <el-radio label="暴力"></el-radio>
                            <el-radio label="反动"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="banVideo">确 定</el-button>
            </span>
        </el-dialog>
    </el-container>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                dialogVisible: false,
                loading: false,
                choseVideo: '',
                rTime:2,
                nav: [{
                        title: '举报管理',
                        active: true,
                        block: 'report',
                        icon: '',
                        type:'nav'
                    },
                    {
                        title: '举报申诉',
                        active: false,
                        block: 'appeal',
                        icon: 'el-icon-remove-outline',
                        type:'nav'
                    },
                ],
                tags:[{title:'擂台',active:true,tag:'leitai',type:'tag'},
                     {title:'武林',active:false,tag:'wulin',type:'tag'},
                     {title:'风云',active:false,tag:'fengyun',type:'tag'},
                ],
                videos: [ ],
                modalConf: {
                    class: false,
                    resource: '内容不良',
                    title: ''
                },
                page: {
                    pageContent: 2, //总页数
                    currentPage: 1, //当前页
                    pageSize: 9 //每页条数
                },
                 value:{
                    resource:'内容不良'
                },
            }
        },
        components: {},
        methods: {
            handleCurrentChange(val) {
                this.$router.push({
                    params: {
                        page: val
                    }
                });
            },
            changeList(index,tag) {
                if(tag.type=='nav'){
                    this.$router.push({
                    params: {
                        block: tag.block,
                        tag: 'leitai',
                        page: 1
                    }
                });
                }else{
                    this.$router.push({
                    params: {
                        tag: tag.tag,
                        page: 1
                    }
                });
                }
            },
            getVideoInfo() { //获取视频列表
                
                let data = {
                    // id:this.$route.params.id, //用户id
                    // tag:this.$route.params.block //当前选择模块
                    // tag:this.$route.params.tag //当前二级模块
                    // tag:this.$route.params.page //当前标签页数
                }
                this.loading = true;
                setTimeout(() => {
                    this.videos = [ //返回视频列表
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '9999',
                            reason:'内容不良',
                            time:'3',
                            name:'小张',
                        }
                    ];
                    this.page = { //返回分页信息
                        pageContent: 2, //总页数
                        currentPage: parseInt(this.$route.params.page), //当前页
                        pageSize: 9 //每页条数
                    };
                    this.loading = false;
                }, 1000);
            },
            watchRouter() {
                let block = this.$route.params.block;
                let tag = this.$route.params.tag;
                this.nav.map((v, k) => {
                    v.active = false;
                    if (block === v.block) {
                        v.active = true;
                    }
                })
                this.tags.map((v, k) => {
                    v.active = false;
                    if (tag === v.tag) {
                        v.active = true;
                    }
                })
                this.getVideoInfo();
                block == 'appeal' ? this.modalConf.class = true : this.modalConf.class = false
            },
            banVideo() { //限制视频
                this.dialogVisible = false;
                let message = "";
                this.modalConf.class ? message = "解封申请已提交，等待上级审核" : message = "限制成功，平台用户将不能观看此视频。";
                setTimeout(() => {
                    this.$message({
                        type: 'success',
                        message: message
                    });
                    this.getVideoInfo(); //重新请求 或者移除当前
                }, 1000);
            }
        },
        watch: {
            '$route' (to, from) {
                this.watchRouter();
            }
        },
        created() {
            this.watchRouter();
        }
    }
</script>

<style scoped lang="less">
    .tabs-title,.tag-list{
        .tabs-title-ul,.tag-list-ul{
            display: flex;
            display: -webkit-flex;
            width: 100%;
            li {
                background: #fff;
                color: #333;
                padding: 10px;
                text-align: center;
                cursor: pointer;
                font-size: 24px
            }
            
            li.active {
                // background: #EB3A11;
                color: #EB3A11
            }
        }
    }
    .tag-list .tag-list-ul {
                li { background: #fff;
                color: #333;
                padding: 0 10px 10px 10px;
                text-align: center;
                cursor: pointer;
                font-size: 16px}
            }
    .block {
        text-align: center;
        margin-top: 20px
    }
    .video-list {
        width: 850px;
        padding: 0 10px;
        ul.video-card {
            display: flex;
            display: -webkit-flex;
            width: 100%;
            flex-wrap: wrap;
            li {
                width: 165px;
                height: 165px;
                overflow: hidden;
                padding: 1px;
                position: relative;
                img {
                    width: 100%
                }
                .jubao-reason{width: 98%;height: 60%;left: 1%;top: 20%;background: rgba(0,0,0,.5);position: absolute;z-index: 99;color: #fff;text-align: center;display:none;
                span{margin-top: 15px}
                .jbr{margin: 0;position: absolute;bottom: 5px;right: 5px;color: #fff;font-size: 12px}
                }
                .jinzhi {
                    position: absolute;
                    z-index: 9;
                    top: 5px;
                    right: 5px;
                    color: #333;
                    font-size: 24px;
                    display: none;
                    cursor: pointer;
                    background: rgba(0, 0, 0, .1);
                    border-radius: 100px
                }
                .jinzhi.el-icon-circle-check-outline {
                    color: green;
                }
                .jinzhi.el-icon-remove-outline {
                    color: #EB3A11
                }
                .timess{color: #EB3A11;font-size: 12px;position: absolute;top: 5px;left: 5px;}
            }
            li:hover {
                .jinzhi,.jubao-reason{
                    display: block
                }
            }
        }
    }
</style>
