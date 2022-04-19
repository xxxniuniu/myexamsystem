<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>分析统计</el-breadcrumb-item>
            <el-breadcrumb-item>成绩分析</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="20">
            <el-col :span="4" style="margin-top:8px;">
                <span style="margin-top:5px;">请选择您需要查看的考试</span>
            </el-col>
            <el-col :span="15" style="text-align:left;">
                <el-select  placeholder="请选择" filterable v-model="whichexam" style="width:400px">
                    <el-option
                        v-for="item in templates"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <el-card class="analysisTask" header="成绩分析" style="font-weight: bold;">
                    <chartLine ref="chart_line_one"/>     
                </el-card>
                <el-card header="总结报告" style="font-weight: bold;">
                    <ul>
                        <li style="text-align:left;" v-show="isShow">
                            <el-collapse v-model="activeNames_1" @change="handleChange">
                            <el-collapse-item title="成绩分析" name="1">
                                <div>{{scoreAnalyse}}</div>
                            </el-collapse-item>
                            </el-collapse>
                        </li>
                        <li style="text-align:left;" v-show="isShow">
                            <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item title="难度调整" name="1">
                                <ul>
                                    <li><div>题号102 ：难度系数由0.5上升至0.6 ，更改为"较难"</div></li>
                                    <li><div>题号104 ：难度系数由0.6下降至0.5 ，仍为"较难"</div></li>
                                </ul>
                                
                                
                            </el-collapse-item>
                            </el-collapse>
                        </li>
                    </ul>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card class="analysisTask" header="知识点分析" style="font-weight: bold;">
                    <div id="main" style="width: 600px;height: 453px;"></div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import chartLine from '@/components/Charts/chartLine'
import chartPie from '@/components/Charts/chartPie'
import ChartPie from '../Charts/chartPie.vue'

//1.导入echarts
import * as echarts from 'echarts'

export default {
    name: "",
    data(){
        return{
            activeNames: [],
            activeNames_1: [],
            scoreAnalyse:'成绩分布接近于正态分布，试卷难度适中',
            templates:[
                {
                    value:'2019-2020(一)高等数学上期末考试',
                    label:'2019-2020(一)高等数学上期末考试'
                },
                {
                    value:'2020-2021(1)计算机网络期末模拟考试',
                    label:'2020-2021(1)计算机网络期末模拟考试'
                },                
            ],
            isShow:false,
            whichexam:'',
            orgOptions: {},
            name:'人数',
            xData: ['0-39分', '40-49分', '50-59分', '60-69分','70-79分','80-89分','90-100分'],
            yData: [4, 1, 4, 12, 14,8,3],
            charts: '',
                opinion:['网络层次划分','应用层','物理层',"TCP/IP协议","其他"],
                opinionData:[
                    {value:10, name:'网络层次划分'},
                    {value:15, name:'应用层'},
                    {value:20, name:'物理层'},
                    {value:15, name:'TCP/IP协议'},
                    {value:40, name:'其他'}
                ]
        }
    },
    methods:{
        handleChange(val) {
            console.log(val);
        },
        drawPie(id){
            this.charts = echarts.init(document.getElementById(id))
            this.charts.setOption({
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data:this.opinion
                },
                series: [
                    {
                        name:'知识点',
                        type:'pie',
                        radius:['50%','60%','30%'],
                        avoidLabelOverlap: false,
                        label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'blod'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:this.opinionData
                    }
                ]
               })
            }
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                // this.drawPie('main')
            })
        },
    computed:{
        // show1chart:function(){
        //     if (this.whichexam =="2020-2021(1)计算机网络期末模拟考试"){
        //         return this.$refs.chart_line_one.initChart(name,xData,yData)
        //     }
        // }
    },
    watch: {
        whichexam(newName, oldName) {
            this.isShow = true
            this.$refs.chart_line_one.initChart(this.name,this.xData,this.yData)
            this.drawPie('main')
        }
    } ,
    components: {
       chartLine,
       chartPie
    }
    
}

</script>
<style lang="less">
    span{
        text-align: center;
    }
</style>