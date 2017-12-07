<template>
    <el-container class="home-page">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="■ 用户量统计" name="one" class="cone"></el-tab-pane>
                            <el-tab-pane label="■ 用户充值额" name="two" class="cone"></el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-date-picker v-model="value" @change='selectChange' value-format="yyyy-MM" format="yyyy-MM" :editable="false" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" unlink-panels> </el-date-picker>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <charts :config="opt" :charts="chart" ref="charts"></charts>
        </el-main>
    </el-container>
</template>

<script type="text/ecmascript-6">
    import charts from '../charts/charts';
    export default {
        /**
         * 图表  chart 图表配置，id唯一，高度宽度自定义，使用flex布局，超出宽度自动换行
         */
        data() {
            return {
                activeName: 'one',
                value: '',
                chart: [{ //图表个数
                        id: 'charts',
                        width: '71%',
                        height: '400px'
                    },
                    { //图表个数
                        id: 'charts-round',
                        width: '30%',
                        height: '200px'
                    },
                    { //图表个数
                        id: 'charts-round-02',
                        width: '30%',
                        height: '200px'
                    },
                ],
                opt: [{ //图表配置
                        title: {
                            show: false,
                        },
                         tooltip: {
                            trigger: 'axis'
                        },
                        legend: {
                                data:['用户量','用户充值额']
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
                                name: '用户量',
                                smooth: true,
                                data: [
                                    [0, 30], //数据
                                    [3, 40], //数据
                                    [5, 65]
                                ]
                            },
                            {
                                type: 'line',
                                name: "用户充值额",
                                smooth: true,
                                data: [
                                    [0, 40],
                                    [5, 20],
                                    [7, 50],
                                ]
                            }
                        ]
                    },
                    //饼图
                    {
                        title: {
                            text: '男女比例统计'
                        },
                        tooltip: {
                            // trigger: 'item',
                            // formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            radius: ['70%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                    value: 335,
                                    name: '男'
                                },
                                {
                                    value: 310,
                                    name: '女'
                                },
                            ]
                        }]
                    },
                    //饼图
                    {
                        title: {
                            text: '地域比例统计'
                        },
                        tooltip: {
                            // trigger: 'item',
                            // formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        series: [{
                            type: 'pie',
                            radius: ['70%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '20',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [{
                                    value: 335,
                                    name: '男'
                                },
                                {
                                    value: 310,
                                    name: '女'
                                },
                            ]
                        }]
                    },
                ],
                pickerOptions: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6
                    }
                },
            }
        },
        components: {
            charts: charts
        },
        methods: {
            selectChange(val) { //选中后触发
                // console.log(val)
                let data = {
                    startDate: val[0],
                    endDate: val[1],
                };
                this.$store.state.fullscreenLoading = true;
                this.updateCharts(data);
            },
            updateCharts(data = {}) {
                this.$http(this.$ApiSetting.homeCharts, data).then(res => {
                    this.$store.state.fullscreenLoading = false;
                    res.data[0].map((v, k) => {
                        this.opt[0].series[k].data = v;
                    })
                    this.opt[1].series[0].data = res.data[1];
                    this.opt[2].series[0].data = res.data[2];
                    this.$refs.charts.updateCharts();
                })
            }
        },
        created() {
            this.$store.state.fullscreenLoading = true;
            this.updateCharts();
        }
    }
</script>

<style lang="less">

</style>
