/*
 * @Author: zhanghongqiao 
 * @Date: 2021-12-01 15:33:41 
 * @Email: 991034150@qq.com 
 * @Description: 产废量统计
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 16:10:00
 */

 
import * as  echarts from "echarts"
import { merge } from "lodash"
import common from '../common'
import { noDataOption } from '../common'  
import { mapState } from "vuex";
export default {
  template: '<div></div>',
  data() {
    return {
      defaultSetting: {},
      legendData: ['一般工业固废', '生活垃圾', '医疗废物', '建筑垃圾', '农业废弃物', '危险固废']
    }
  },
  props: {
    selector: String,
    sourceData: Array,
    option: Object, // 配置项 
  },
  computed: {
    ...mapState('menus', ['isOpenSideMenu']),
  },
  mounted() {
    this.options = merge({}, this.defaultSetting, this.option, common.options)
    // 初始化图表
    this.myChart = echarts.init(document.querySelector(this.selector))
    this.initChart()
    window.addEventListener('resize', () => {
      if (this.myChart) {
        this.myChart.resize()
      }
    })
  },
  methods: {
    initChart() {
      this.myChart.clear()
      if (_.isEmpty(this.sourceData)) { 
        return this.myChart.setOption(noDataOption)
      } 
      let xAxis = [] 
      for(let i = 1; i< 13; i++) {
        xAxis.push(i+'月')
      }

      let series  = []
      let  data = [] 
      this.legendData.map(item => {
        for(let i = 1; i< 13; i++) {
          data.push(Math.random()*10)
        } 
        series.push({
          name: item,
          type: 'bar',
          barWidth: 8, 
          data: data,
          stack: '统计', 
        })
      }) 
      const { axisLine, labelColor, axisTick, splitLine } = this.options
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          },  
        },
        color: ['#00BBFF', '#8BC349', '#FFDF02', '#0777DD', '#FF7F00', '#F54336'],
        legend: {
          data: this.legendData, 
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: labelColor
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis,
            interval: 12,
            splitLine: splitLine, 
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: { 
              color: labelColor,
              interval:0   
            }
          }
        ],
        yAxis: [
          {
            type: 'value',  
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            
            splitLine: splitLine,
            axisLabel: {
              color: labelColor,  
              interval: 1,
              formatter(val) {
                return val + 'k'
              } 
            }
          }
        ],
        series: series 
      };
      this.myChart.resize()
      this.myChart.setOption(option)
    },
  },
  watch: {
    sourceData: 'initChart',
    isOpenSideMenu() {
      setTimeout(() => {
        this.myChart && this.myChart.resize()
      }, 100)
    }
  }
}
