<template>
  <div class="other">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品库存统计</span>
          </div>
          <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品分类统计</span>
          </div>
          <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>商品订单统计</span>
          </div>
          <div id="myChart" :style="{ width: '300px', height: '300px' }"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Echarts from 'echarts'
export default {
  name: 'Other',
  data() {
    return {
      msg: 'sss',
    }
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = Echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      })
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
</style>
