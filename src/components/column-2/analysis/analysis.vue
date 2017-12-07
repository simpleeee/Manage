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
                        <div class="grad-content"><p class="title">发布者</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>{{userInfo.nick}}</p>
                        </div>
                    </el-col>

                    <el-col :span="5">
                        <div class="grad-content"><p class="title">阵营方</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>{{userInfo.place}}</p>
                        </div>
                    </el-col>

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
                    <el-col :span="5">
                        <div class="grad-content"><p class="title">阵营排名</p></div>
                    </el-col>
                    <el-col :span="5">
                        <div class="grad-content">
                            <p>NO.{{userInfo.No}}</p>
                        </div>
                    </el-col>
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
                <el-row>
                    <el-col :span="5">
                        <div class="grad-content"><p class="title">上擂次数</p></div>
                    </el-col>
                    <el-col :span="18">
                        <div class="grad-content">
                            <p>{{userInfo.times}}</p>
                        </div>
                    </el-col>
                </el-row>
                <div class="charts">
                    <charts :config="opt" :charts="chart" ref="charts"></charts>
                </div>
            </el-aside>
            <el-main>
                <div class="tab-video">
                      <div class="video-box">
                          <i class="el-icon-remove-outline jinzhi"></i>
                          <p style="text-align:center;color:#fff;line-height:450px;cursor: pointer;" @click="!isPlay?isPlay=true:isPlay=false" v-if="!isPlay">点击播放</p>
                          <video controls  width="100%" autoplay preload v-if="isPlay">
                            <source :src="userInfo.videoSrc" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'></source>
                            您的浏览器不支持 video 标签。
                          </video>
                      </div>
                      <div class="times"><i class="el-icon-warning"></i><span class="red">  共{{userInfo.palyTimes}}次</span></div>
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
                    content:'如果该视频已经被限制，则鼠标放于视频上浮现限制原因，右上角显示解封图标，解封需要上传到上级审核；',
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
                                data:['辣椒币','评论数']
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
                            name: "月份\n/月",
                        },
                        yAxis: {
                            name: "数量\n/W"
                        },
                        series: [{
                                type: 'line', //折线
                                name: '辣椒币',
                                smooth: true,
                                data: [
                                    [0, 30], //数据
                                    [3, 40], //数据
                                    [5, 65]
                                ]
                            },
                            {
                                type: 'line',
                                name: "评论数",
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
            this.loading = true;
            this.title=[
                {
                        label: '用户审核',
                        to: '/user-examine/1'
                    },
                    {
                        label: '用户信息',
                        to: '/user-info/'+this.userInfo.id+'/user-video/leitai'
                    },
                     {
                        label: '视频分析'
                    }
            ]
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
