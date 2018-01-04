<template>
    <el-container class="adduser" v-loading='loading'>
        <el-header class="gr-header">
            <div class="tabs-title grid">
                <ul class="tabs-title-ul">
                    <li v-for="(tab,index) in nav" :key="index" :class="{active:tab.active}" @click='changeList(index)'><i :class="tab.icon"></i> {{tab.title}}</li>
                </ul>
            </div>
            <div class="grid-content grid">
                <el-date-picker v-model="value02" @change='selectChange' value-format="yyyy-MM" format="yyyy-MM" :editable="false" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" unlink-panels> </el-date-picker>
            </div>
        </el-header>
        <el-main>
            <div class="video-list">
                <ul>
                    <ul class="video-card">
                        <li v-for="(video,index) in videos" :key="index"><i class="jinzhi" :class="modalConf.class? 'el-icon-circle-check-outline':'el-icon-remove-outline'" @click="dialogVisible=true,choseVideo=video.id"></i>
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
                nav: [{
                        title: '待审核视频',
                        active: true,
                        tag: 'on',
                        icon: ''
                    },
                    // {
                    //     title: '已禁视频',
                    //     active: false,
                    //     tag: 'off',
                    //     icon: 'el-icon-remove-outline'
                    // },
                ],
                videos: [],
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
                value: {
                    resource: '内容不良'
                },
                value02:'',
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
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
            changeList(index) {
                this.$router.push({
                    params: {
                        tag: this.nav[index].tag,
                        page: 1
                    }
                });
            },
            selectChange(val) { //时间选择
                let data = {
                    startDate: val[0],
                    endDate: val[1],
                    page: 1,
                };
                // this.pageInit(data,res=>{});
                // console.log(this.value)
            },
            getVideoInfo() { //获取视频列表
                //   console.log(1);
                let data = {
                    // id:this.$route.params.id, //用户id
                    // tag:this.$route.params.tag //当前选择标签
                    // tag:this.$route.params.page //当前标签页数
                }
                this.loading = true;
                setTimeout(() => {
                    this.videos = [ //返回视频列表
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '9999'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '2'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '3'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '4'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '5'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '6'
                        },
                        {
                            img: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                            id: '7'
                        },
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
                // let tag = this.$route.params.tag;
                // this.nav.map((v, k) => {
                //     v.active = false;
                //     if (tag === v.tag) {
                //         v.active = true;
                //     }
                // })
                this.getVideoInfo();
                // tag == 'off' ? this.modalConf.class = true : this.modalConf.class = false
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
.gr-header{
display: flex;display: -webkit-flex;
.grid{flex: 1}
.grid-content{display: flex;display: -webkit-flex;align-items: center}
}

    .tabs-title {
        .tabs-title-ul {
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
                .jinzhi {
                    position: absolute;
                    z-index: 9;
                    top: 10px;
                    right: 10px;
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
            }
            li:hover {
                .jinzhi {
                    display: block
                }
            }
        }
    }
</style>
