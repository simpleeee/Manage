<template>
    <div class="chart-box" >
        <div v-for="(chart,index) in charts" :key="index" class="chare-d" :style="'width: '+chart.width+';height:'+chart.height">
            <div class="charts" :id="chart.id" :style="'width: 100%;height:'+chart.height"></div>
        </div>
        <!-- <div class="charts" id="charts" style="width: 60%;height: 400px;"></div> -->
    </div>
</template>

<script type="text/ecmascript-6">
import echarts from 'echarts';
 export default {
     props:['config',"charts"],
     data() {
    return {
       
 }

 },
 methods:{
    updateCharts(){
        this.charts.map((v,k)=>{
                let mychart=echarts.init(document.getElementById(v.id));
                //    console.log(this.config)
                mychart.setOption(this.config[k]);
            })
    }
},
 mounted(){
     
           
        },
watch:{
    // 'config'(){
    //     console.log(1);
    // }
}
 }
</script>

<style scoped lang="less">
.chart-box{display: flex;display: -webkit-flex;flex-wrap: wrap;}
 .chare-d{margin-top: 30px}
</style>
