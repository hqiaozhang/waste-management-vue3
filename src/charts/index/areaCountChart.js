/*
 * @Author: zhanghongqiao 
 * @Date: 2022-02-23 09:51:53 
 * @Email: 991034150@qq.com 
 * @Description: 面积统计图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 16:09:00
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
      const { axisLine, labelColor, axisTick, splitLine } = this.options
      let option = { 
        color: ['#00BBFF', '#FF7F00'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: labelColor
          },
          data: ['入库', '出库']
        },
        
        grid: {
          left: '1%',
          right: '2%',
          bottom: '3%',
          top: '14%',
          // top: '18px',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis,
            splitLine: splitLine, 
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: { 
              color: labelColor,
              interval:0,
              fontSize: 11   
            }
          }
        ],
        yAxis: [
          {
            type: 'value', 
            name: '万吨',
            nameTextStyle: {
              color: labelColor
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: splitLine,
            axisLabel: {
              color: labelColor, 
              formatter(val) {
                return val + 'k'
              } 
            }
          }
        ],
        series: [
          {
            name: '入库',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(0,187,255, 1)'
                }, {
                  offset: 1,
                  color: 'rgba(0,187,255, .1)'
                }])
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210, 150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '出库',
            type: 'line',
            stack: 'Total',
            symbol: 'none',
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(255, 127, 0, 0.5)'
                }, {
                  offset: 1,
                  color: 'rgba(255, 127, 0, .1)'
                }])
              }
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310, 320, 332, 301, 334, 390, 330, 320]
          },
          
        ]
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
