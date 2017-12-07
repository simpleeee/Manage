<template>
 <div class="video-tabs" v-loading='loading'>
     <div class="tabs-title">
         <ul class="tabs-title-ul">
             <li v-for="(tab,index) in nav" :key="index" :class="{active:tab.active}" @click='changeList(index)'>{{tab.title}} {{tab.num}}</li>
         </ul>
     </div>
     <div class="card">
          <div class="charts">
                    <charts :config="opt" :charts="chart" ref="charts"></charts>  <!-- 这个没看明白 -->
           </div>     
    </div>
 </div>
</template>

<script type="text/ecmascript-6">
import charts from '../../charts/charts';
 export default {
 data() {
 return {
     dialogVisible:false,
     loading:false,
     choseVideo:'',
     nav:[
         {title:'辣椒币',num:'44W',active:true,tag:'money'},
         {title:'消费总额',num:'4444',active:false,tag:'RNB'},
         {title:'葱花粉',num:'555',active:false,tag:'fans'},
     ],
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
 components: {
            charts: charts
        },
 methods:{
    changeList(index){
        this.$router.push({params: { tag: this.nav[index].tag,page:1}});
    },
     watchRouter(){
          let tag=this.$route.params.tag;
          this.nav.map((v,k)=>{
            v.active=false;
            if(tag===v.tag){v.active=true;}
            })
            this.updateCharts();
     },
     
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
 watch:{
     '$route'(to,from){
         this.watchRouter();
     }
 },
 created(){
      this.watchRouter();
 }
 }
</script>

<style lang="less">
.video-tabs{
    width: 490px;
    .tabs-title{
        .tabs-title-ul{display: flex;display: -webkit-flex;width: 100%;
            li{flex: 1;background: #fff;color: #333;padding: 10px;text-align: center;cursor: pointer}
            li.active{background: #EB3A11;color: #fff}
        }

    }
    .card{
       
        
    }
}
 
</style>
