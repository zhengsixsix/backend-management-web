<template>
  <div class="other">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品库存统计</span>
          </div>
          <div id="myChart"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品分类统计</span>
          </div>
          <div class="classType" ref="classTypeRef"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品订单统计</span>
          </div>
          <div class="orderNum" ref="orderNumRef"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Echarts from 'echarts'
import { getInventory, getClass } from '@/api/others'
export default {
  name: 'Other',
  data() {
    return {
      msg: 'sss',
    }
  },
  mounted() {
    this.getData()
    this.getDataClass()
    this.initEachartOrder()
  },
  methods: {
    async getData() {
      let { data } = await getInventory()
      if (data.code == 200) {
        this.drawLine(data.data.xData, data.data.YData)
      }
    },
    async getDataClass() {
      let { data } = await getClass()
      if (data.code == 200) {
        this.initEachartClass(data.data.xData, data.data.YData)
      }
    },
    initEachartClass(xAxis, yAxis) {
      let dom = this.$refs['classTypeRef']
      let myChart = Echarts.init(dom)
      const data = yAxis
      const sideData = data.map((item) => item + 0.1)
      let option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b} : {c}',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '10%',
        },
        xAxis: {
          data: xAxis,
          //坐标轴
          axisLine: {
            lineStyle: {},
          },
          //坐标值标注
        },
        yAxis: {
          //坐标轴
          axisLine: {
            show: false,
          },
          //坐标值标注
          //分格线
          splitLine: {
            lineStyle: {
              color: '#4784e8',
            },
          },
        },
        series: [
          {
            name: 'a',
            tooltip: {
              show: false,
            },
            type: 'bar',
            barWidth: 24.5,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#0B4EC3', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#138CEB', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#17AAFE', // 100% 处的颜色
                    },
                  ],
                  global: false,
                },
              },
            },
            data: data,
            barGap: 0,
          },
          {
            type: 'bar',
            barWidth: 8,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#09337C', // 0% 处的颜色
                    },
                    {
                      offset: 0.6,
                      color: '#0761C0', // 60% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#0575DE', // 100% 处的颜色
                    },
                  ],
                  global: false,
                },
              },
            },
            barGap: 0,
            data: sideData,
          },
          {
            name: 'b',
            tooltip: {
              show: false,
            },
            type: 'pictorialBar',
            itemStyle: {
              borderWidth: 1,
              borderColor: '#0571D5',
              color: '#1779E0',
            },
            symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
            symbolSize: ['30', '12'],
            symbolOffset: ['0', '-11'],
            //symbolRotate: -5,
            symbolPosition: 'end',
            data: data,
            z: 3,
          },
        ],
      }
      myChart.setOption(option)
    },
    drawLine(xAxis, yAxis) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = Echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: xAxis,
        },
        grid: {
          left: '5%',
          right: '5%',
          top: '5%',
          bottom: '10%',
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: 'bar',
            data: yAxis,
            barMaxWidth: 30,
            itemStyle: {
              barBorderRadius: [20, 20, 0, 0],
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#00BFFF',
                  },
                  {
                    offset: 1,
                    color: '#54FF9F',
                  },
                ],
              },
            },
          },
        ],
      })
    },
    initEachartOrder() {
      let myChart = Echarts.init(this.$refs['orderNumRef'])
      let option = {
        grid: {
          left: '0%',
          right: '3%',
          top: '5%',
          bottom: '10%',
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: [
          {
            type: 'value',
            position: 'right',

            axisTick: {
              show: false,
              length: 15,
            },
            splitLine: {
              show: false,
            },
          },
        ],
        series: [
          {
            type: 'line',
            smooth: true, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: '#fff', // 线条颜色
              },
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
              },
            },
            itemStyle: {
              color: 'red',
              borderColor: '#fff',
              borderWidth: 3,
            },
            tooltip: {
              show: false,
            },
            areaStyle: {
              normal: {
                color: new Echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#eb64fb',
                    },
                    {
                      offset: 1,
                      color: '#3fbbff0d',
                    },
                  ],
                  false,
                ),
              },
            },
            data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200],
          },
        ],
      }
      myChart.setOption(option)
    },
  },
}
</script>
<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}
#myChart {
  width: 790px;
  height: 300px;
}
.classType {
  width: 790px;
  height: 300px;
}
.orderNum {
  width: 1645px;
  height: 300px;
}
</style>
