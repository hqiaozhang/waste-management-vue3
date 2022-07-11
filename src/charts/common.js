// import {getBroswer} from '@/utils/util'

let screenH = window.innerHeight
// let lableFs = screenH === 1080 ? 12 : screenH / 1080 * 14
// let richFsize = screenH === 1080 ? 14 : screenH / 1080 * 10
let lableFs = 14
let richFsize = 10
const hlColor = '#FF7F00'
const labelColor = 'rgba(255,255,255,0.65)' 
const lineColor = 'rgba(255,255,255,0.15)'
const splitLineColor = 'rgba(255,255,255,0.45)'
// var broswervs = getBroswer()
export default {
  options: {
    hlColor: hlColor,
    lineColor: lineColor,
    splitLineColor: splitLineColor,
    labelColor: labelColor, 
    axisLine: {
      lineStyle: {
        color: lineColor,
      }
    },
    splitLine: {
      lineStyle: {
        color: lineColor,
      }
    },
    axisLabel: {
      color: splitLineColor
    },
    axisTick: {
      lineStyle: {
        color: lineColor,
      }
    },  
    richFs: {
      subFs: {
        verticalAlign: 'bottom',
        padding: [-2, 0, 0, 0],
        fontSize: richFsize,
      },
      supFs: {
        verticalAlign: 'top',
        padding: [0, 0, -5, 0],
        fontSize: richFsize,
      },
      pl4:  {
        fontSize: lableFs,
        padding: [0, 0, 0, -4],
      },
    },
  }
}

export const dataZoom_inside =[{
    textStyle: {
      color: '#8392A5'
    },
    showDataShadow: false,
    bottom: 0,
    backgroundColor: 'rgba(129, 143, 180, 0.2)',
    handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
    handleSize: 12,
    handleStyle: {
      shadowBlur: 0,
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      // shadowColor: '#aaa'
    },
    dataBackgroundColor: 'none', // 底色
    fillerColor: '#B4D0F0', // 选中的颜色
    handleColor:'#1D84EF', // 滑块颜色
    type: 'slider',
    showDetail: false,
    height: "6px",
    y: "90%"
}]

export const noDataOption = {
  title: {
    text: '暂无数据',
    x: 'center',
    y: 'center',
    textStyle: {
      color: '#909399',
      fontWeight: 'normal',
      fontSize: 14
    }
  }
}
