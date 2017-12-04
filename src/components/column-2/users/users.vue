<template>
    <el-container class="home-page">
        <el-header>
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content">
                        <el-tabs v-model="activeName" @tab-click="changeChart">
                            <el-tab-pane label="■ 用户量统计" name="one" class="cone"></el-tab-pane>
                            <el-tab-pane label="■ 用户总充值月额" name="two" class="cone"></el-tab-pane>
                        </el-tabs>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content">
                        <el-select v-model="value.val0" placeholder="请选择" size="mini">
                            <el-option v-for="item in options.op01" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                        至
                        <el-select v-model="value.val1" placeholder="请选择" size="mini">
                            <el-option v-for="item in options.op02" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-col>
            </el-row>
        </el-header>
        <el-main>
            <charts :config="opt" :charts="chart"></charts>
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
                value: {
                    val0:'',
                    val1:'',
                    
                },
                options: {
                    op01:[{
                    value: 'op1-1',
                    label: '2017.1'
                }, {
                    value: 'op1-2',
                    label: '2017.2'
                }, {
                    value: 'op1-3',
                    label: '2017.3'
                }, {
                    value: 'op1-4',
                    label: '2017.4'
                }, {
                    value: 'op1-5',
                    label: '2017.5'
                }],


                op02:[{
                    value: 'op2-1',
                    label: '2018.1'
                }, {
                    value: 'op2-2',
                    label: '2018.2'
                }]


                },
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
                        tooltip: {},
                        toolbox: {
                            feature: {
                                dataView: {},
                                saveAsImage: {
                                    pixelRatio: 2
                                },
                                restore: {}
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
                                name: '男',
                                smooth: true,
                                data: [
                                    [0, 30], //数据
                                    [3, 40], //数据
                                    [5, 65]
                                ]
                            },
                            {
                                type: 'line',
                                name: "女",
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
                             text:'男女比例统计'
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
                             text:'地域比例统计'
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
                                    name: '南'
                                },
                                {
                                    value: 90,
                                    name: '北'
                                },
                            ]
                        }]
                    }
                ]
            }
        },
        components: {
            charts: charts
        },
        methods: {
            changeChart(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="less">
  @import url("../../../assets/css/public");
    .home-page {
        .el-header {
            background: #fff
        }
        .el-main {
            background: #fff
        }
        .grid-content {
            line-height: 60px
        }
        .el-tabs__item {
            font-size: 20px
        }
        .el-tabs__item.is-active,
        .el-tabs__item:hover,
        .el-tabs__item:focus,
        .el-tabs__item:focus:active {
            color: @Scendcolor
        }
        .el-tabs__nav-wrap::after,
        .el-tabs__active-bar {
            visibility: hidden
        }
        .el-tabs__item {}
    }
</style>
