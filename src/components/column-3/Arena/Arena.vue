<template>
    <el-container class="home-page">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-tabs v-model="activeName">
                            <el-tab-pane label="总台统计" name="one" class="cone"></el-tab-pane>
                            <!-- <el-tab-pane label="■ 用户充值额" name="two" class="cone"></el-tab-pane> -->
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
    import charts from '../../charts/charts';
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
                        width: '80%',
                        height: '450px'
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
                    { //图表个数
                        id: 'charts-round-03',
                        width: '30%',
                        height: '200px'
                    },
                ],
                opt: [{
                        legend: {
                            data: ['视频数', '话题数', '浏览量', '消费额']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        xAxis: [{
                            type: 'category',
                            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                        }],
                        yAxis: [{
                            type: 'value'
                        }],
                        series: [{
                                name: '视频数',
                                type: 'bar',
                                data: [320, 332, 301, 334, 390, 330, 320, 320, 332, 301, 334, 390]
                            },
                            {
                                name: '话题数',
                                type: 'bar',
                                data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
                            },
                            {
                                name: '浏览量',
                                type: 'bar',
                                data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                            },
                            {
                                name: '消费额',
                                type: 'bar',
                                data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190]
                            },
                        ]
                    },
                    //饼图
                    {
                        title: {
                            text: '视频数占比'
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
                                    name: '1'
                                },
                                {
                                    value: 310,
                                    name: '2'
                                },
                            ]
                        }]
                    },
                    //饼图
                    {
                        title: {
                            text: '消费额占比'
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
                                    value: 200,
                                    name: '1'
                                },
                                {
                                    value: 90,
                                    name: '2'
                                },
                            ]
                        }]
                    },
                    //饼图
                    {
                        title: {
                            text: '浏览量占比'
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
                                    value: 200,
                                    name: '1'
                                },
                                {
                                    value: 90,
                                    name: '2'
                                },
                            ]
                        }]
                    }
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
                this.$http(this.$ApiSetting.ArenaCharts, data).then(res => {
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
