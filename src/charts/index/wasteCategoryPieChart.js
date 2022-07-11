/*
 * @Author: xiexiaoying
 * @Date: 2022-02-09 09:56
 * @Email: 634021337@qq.com
 * @Description: 报警统计
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 16:10:07
 */

import * as echarts from 'echarts'
import { merge } from "lodash"
import common  from '../common'
import {mapState} from "vuex";

export default {
  template: '<div></div>',
  data() {
    return {
      defaultSetting: {}
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
    this.options = merge({}, this.defaultSetting, common.options, this.option)
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
      // if (_.isEmpty(this.sourceData)) {
      //   return
      // }
      let option = {
        color: ['#F54336', '#FF7F00', '#0777DD','#FFDF02', '#8BC349', '#00BBFF'],
        tooltip: {
          trigger: 'item'
        }, 
        series: [{
          type: 'pie',
          zlevel: 1,
          silent: true,
          radius: ['68%', '69%'],
          label: {
            normal: {
              show: false
            },
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.pieDotted()
        },{
          type: 'pie', 
          radius: ['55%', '45%'],
          center: ['50%', '50%'],
          minAngle: 10,
          avoidLabelOverlap: true,
          // roseType: 'radius',
          hoverOffset: 15,
          label: {
            show: true,
            position: 'outside',
            width:0,
            height: 0,
            lineHeight: 0,
            backgroundColor: 'auto',
            padding: [2,-2,2,-2],
            borderRadius: 2,
            distanceToLabelLine: 0,
            formatter: '{top|{b}}\n{bottom|{d}}',
            // align: 'left',
            rich: {
              top: {
                // width:30,
                // height:30,
                verticalAlign: 'bottom',
                // bottom：文字在上圆点在下
                // top: 文字在下圆点在上
                // padding: [0, -40, 0, -40],
                // padding：[上， 右， 下，左]，
                // 上：圆点到上文字间距, 文字上移距离
                // 右：文字与右侧圆点间距, 文字左移距离
                // 下：圆点到下文字间距, 文字下移距离
                // 左：文字与左侧圆点间距, 文字右移距离
                padding: [-20, 0,0,0],
                fontSize: 13,
                fontWeight: 600,
                //  align: 'left',
                // center:文字圆点居中，right文字在圆点左侧，left文字在圆点右侧
              },
              bottom: {
                // padding: [0, -40, 2, -40],
                // verticalAlign: 'top',
                fontSize: 15,
                padding: [20, 0,0,0],
                // color: 'red'
              },

            }
          },
          labelLine: {
            lineStyle: {
              type: 'dashed',
              margin: 15,
              // color:'transparent'
            },
            // length:20,
            length2:30,
            show: true,
          },
          data: [
            {
              name: '生活垃圾',
              value: 35
            },{
              name: '一般工业固废',
              value: 9
            },{
              name: '医疗废物',
              value: 27
            }, {
              name: '危险固废',
              value: 3
            },{
              name: '建筑垃圾',
              value: 15
            }, {
              name: '农业废弃物',
              value: 8
          },]
        }]
      }

      this.myChart.clear()
      this.myChart.setOption(option)
      this.myChart.resize()
    },

     pieDotted() {
       let dataArr = [];
       for (let i = 0; i < 100; i++) {
         if (i % 2 === 0) {
           dataArr.push({
             name: (i + 1).toString(),
             value: 25,
             itemStyle: {
               normal: {
                 color: "#0777DD",
                 borderWidth: 0,
                 borderColor: "rgba(0,0,0,0)"
               }
             }
           })
         } else {
           dataArr.push({
             name: (i + 1).toString(),
             value: 20,
             itemStyle: {
               normal: {
                 color: "rgba(0,0,0,0)",
                 borderWidth: 0,
                 borderColor: "rgba(0,0,0,0)"
               }
             }
           })
         }

       }
       return dataArr

     }
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


