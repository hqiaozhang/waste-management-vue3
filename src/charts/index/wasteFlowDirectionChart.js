/*
 * @Author: zhanghongqiao 
 * @Date: 2022-02-23 09:51:53 
 * @Email: 991034150@qq.com 
 * @Description: 桑基图
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 16:10:12
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
      defaultSetting: {
        labelColor: '#fff'
      }, 
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
    this.options = merge({}, common.options, this.defaultSetting, this.option, )
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
      
      const { labelColor } = this.options
      let option = {
         
        series: {
          type: 'sankey',
          layout: 'none',
          right: 0,
          left: 0,
          emphasis: {
            focus: 'adjacency'
          }, 
          itemStyle: {
            borderWidth: 0,
            borderColor: '#fff'
          },
          label: {
            position: 'insideRight'
          },
          data: [
            {
              name: '废油',
              label: {
                color: labelColor,
                position: 'insideLeft'
              },
              nodeWidth: 2,
              itemStyle: {
                color: '#F54336',
                opacity: 0.45, 
                // shadowColor: '#fff',
                // shadowOffsetX: 2,
                // shadowBlur: 0,
              }
            },
            {
              name: '废木板',
              label: {
                color: labelColor,
                position: 'insideLeft'
              },
              itemStyle: {
                color: '#0777DD',
                opacity: 0.45, 
              },
            },
            {
              name: '废渣',
              label: {
                color: labelColor,
                position: 'insideLeft',
                opacity: 1,
              },
              itemStyle: {
                color: '#8BC349',
                opacity: 0.45, 
              }
            },
            {
              name: '生物柴油',
              label: {
                color: labelColor
              },
              itemStyle: {
                color: '#0777DD',
              }
            },
            {
              name: '低档建筑材料',
              label: {
                color: labelColor
              },
              itemStyle: {
                color: '#4CB051',
              }
            }, 
            {
              name: '建筑材料',
              label: {
                color: labelColor
              },
              itemStyle: {
                color: '#05489B',
              }
            }, 
          ],
          links: [
            {
              source: '废油',
              target: '生物柴油',
              value: 2,
              lineStyle: {
                color: '#F54336',
                opacity: 0.45
              }
            },
            {
              source: '废油',
              target: '低档建筑材料',
              value: 2,
              lineStyle: {
                color: '#F54336',
                opacity: 0.45
              }
            },
            {
              source: '废油',
              target: '建筑材料',
              value: 2,
              lineStyle: {
                color: '#F54336',
                opacity: 0.45
              }
            },
            {
              source: '废木板',
              target: '生物柴油',
              value: 1,
              lineStyle: {
                color: '#0777DD',
                opacity: 0.45
              }
            },
            {
              source: '废木板',
              target: '建筑材料',
              value: 2,
              lineStyle: {
                color: '#0777DD',
                opacity: 0.45
              }
            },
             {
              source: '废渣',
              target: '低档建筑材料',
              value: 1,
              lineStyle: {
                color: '#8BC349',
                opacity: 0.45
              }
            },
            {
              source: '废渣',
              target: '生物柴油',
              value: 2,
              lineStyle: {
                color: '#8BC349',
                opacity: 0.45
              }
            },
            {
              source: '废渣',
              target: '建筑材料',
              value: 3,
              lineStyle: {
                color: '#8BC349',
                opacity: 0.45
              }
            }
          ]
        }
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
