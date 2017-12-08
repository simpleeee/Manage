<template>
    <el-container class="adduser userinfo" v-loading="loading">
        <el-container>
            <el-aside width="520px">
                <el-header>
                    <el-breadcrumb separator-class="el-icon-arrow-right" class="title">
                        <el-breadcrumb-item v-for="item in title" :key="item.label" :to="{ path: item.to }">{{item.label}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-header>
                <el-row>
                    <el-col class="has-head" :span="5">
                        <div class="grad-content"><p class="title">头像</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <div class="head-img"><img :src="userInfo.headImg" alt=""></div>
                        </div>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="5">
                        <div class="grad-content"><p class="title">昵称</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>{{userInfo.nick}}</p>
                        </div>
                    </el-col>

                    <!-- <el-col :span="5">
                        <div class="grad-content"><p class="title">阵营方</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>{{userInfo.place}}</p>
                        </div>
                    </el-col> -->

                </el-row>


                <el-row>
                    <el-col :span="5">
                        <div class="grad-content"><p class="title">账号ID</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>{{userInfo.id}}</p>
                        </div>
                    </el-col>
                    <!-- <el-col :span="5">
                        <div class="grad-content"><p class="title">阵营排名</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>NO.{{userInfo.No}}</p>
                        </div>
                    </el-col> -->
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <div class="grad-content"><p class="title">话题内容</p></div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grad-content">
                            <p>{{userInfo.content}}</p>
                        </div>
                    </el-col>
                </el-row>
                <div class="charts">
                    <charts :config="opt" :charts="chart" ref="charts"></charts>
                </div>
            </el-aside>
            <el-main>
                <div class="tab-video">
                     <router-view></router-view>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script type="text/ecmascript-6">
import charts from '../../charts/charts';
    export default {
        data() {
            return {
                loading: false,
                wulinSHow:false,
                isPlay:false,
                title: [
                ],
                userInfo: {
                    headImg: 'http://xiu.weilot.com/Uploads/syspic/pageimg/yq0KA1Ukpg6ABZfuAAAqShKfIos913.jpg',
                    nick: '江湖一姐',
                    id: '3553553',
                    sex: '女',
                    level: '辣姜V1',
                    place:'Y方意见',
                    address: '澳大利亚',
                    money: 678,
                    comment:999,
                    No:2,
                    content:'如果该视频已经被限制，则鼠标放于视频上浮现限制原因',
                    times:553,
                    success:'50%',
                    palyTimes:99,
                    videoSrc:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'
                },
                chart: [{ //图表个数
                        id: 'charts',
                        width: '100%',
                        height: '300px'
                    }],
                opt: [{ //图表配置
                        title: {
                            show: false,
                        },
                          tooltip: {
                                trigger: 'axis'
                            },
                        legend: {
                                data:['Y方意见','N方意见']
                            },
                        toolbox: {
                            feature: {
                               
                                saveAsImage: {
                                    pixelRatio: 2
                                },
                               
                            }
                        },
                        xAxis: {
                            // show:false,
                            name: "",
                        },
                        yAxis: {
                            name: ""
                        },
                        series: [{
                                type: 'line', //折线
                                name: 'Y方意见',
                                smooth: true,
                                data: [
                                    [0, 30], //数据
                                    [3, 40], //数据
                                    [5, 65]
                                ]
                            },
                            {
                                type: 'line',
                                name: "N方意见",
                                smooth: true,
                                data: [
                                    [0, 40],
                                    [5, 20],
                                    [7, 50],
                                ]
                            }
                        ]
                    }],



            }
        },
        methods:{
            updateCharts(data = {}) {
                this.$http(this.$ApiSetting.userCharts, data).then(res => {
                    this.loading = false;
                    res.data[0].map((v, k) => {
                        this.opt[0].series[k].data = v;
                    });
                    this.$refs.charts.updateCharts();
                })
            }
        },
        created() {
            let block=this.$route.params.block;
            this.loading = true;
            if(block=='Arena'){
                 this.title=[
                {
                        label: '话题列表',
                        to: '/Arena-topic/1'
                    },
                    {
                        label: '话题详情',
                    }
            ]
            }else{
                 this.opt[0].legend={data:['挑战视频','热度（总蒜数）']};
                 this.opt[0].series[0].name='挑战视频',
                 this.opt[0].series[1].name='热度（总蒜数）',
                 this.title=[
                {
                        label: '主题列表',
                        to: '/wulin-list/1'
                    },
                    {
                        label: '主题详情',
                    }
            ]
            }
           
            this.updateCharts();
        },
         components: {
            charts: charts
        },
    }
</script>

<style scoped lang="less">
    .el-aside {
        background: #fff;
        padding: 20px
    }
    .userinfo {
        .grad-content{
            padding: 10px 0 10px 30px;
        }
        .has-head {
            height: 60px;
            line-height: 60px;
        }
         .head-img{width: 60px;height: 60px;overflow: hidden;border-radius: 30px;
                     img{width: 100%}
                    }
        .tab-video{display: flex;display: -webkit-flex;}
        .video-box{width: 380px;height: 380px;border: 1px solid #ddd;display: flex;display: -webkit-flex;flex-flow: column;justify-content: center;background: #000;margin-top: 20px;position: relative;}
        .times{font-size: 14px;margin-left: 20px}
        .jinzhi{position: absolute;right: 10px;top: 10px;color: #fff;font-size: 20px;cursor: pointer;}
    }
</style>
