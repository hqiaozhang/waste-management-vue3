
import {formatterSub} from '@/utils/util'
export {formatterSub}

/**
 *
 * @param {Array}  data     图表数据
 * @param {Aarray} options  图表配置项
 */
export const getLineSeries = (data, options) => {
  const { lineColors, types, symbolColors, symbolSize, linew } = options
  let series = data.map((item, index) => {
    let values = item.values
    let vals = values
    if('PM25/PM10' === item.name) {
      values = []
      let z = 0
      vals.map((val, j) => {
        if(j % symbolColors.length === 0) {
          z = 0
        }
        z++
        values.push({
          value: val,
          itemStyle: {
            color: symbolColors[z]
          }
        })
      })
    }
    return {
      symbolSize: symbolSize,
      data: values,
      name: item.name,
      type:  types.includes(item.name) ? 'scatter' : 'line',
      showSymbol: false,
      smooth: true,
      yAxisIndex: types.includes(item.name)  ? 1 : 0,
      lineStyle: {
        width: linew
      },
      itemStyle: {
        color: lineColors[index],
        opacity: types.includes(item.name) ? 0.8 : 1,
      },
    }
  })
  return series
}


export  const getStackSeries = (data, options) => {
  const { areaColors, symbolSize } = options
  let series = []
  let legendData = []
  data.map((item, index) => {
    if(item.name !==  'NO3-/SO42-') {
      series.push({
        name: item.name,
        type: 'line',
        stack: '总量',
        showSymbol: false,
        lineStyle: {
          color: areaColors[index],
        },
        areaStyle: {
          color: areaColors[index],
          opacity: 1,
        },
        data: item.values
      })
      legendData.push({
        name: item.name,
        textStyle: {
          color: areaColors[index]
        }
      })
    }
  })
  series.push({
    symbolSize: symbolSize,
    name: 'NO3-/SO42-',
    data: data[data.length - 1].values,
    itemStyle: {
      color: '#ADB2C0',
      opacity: 0.8,
    },
    yAxisIndex: 1,
    type: 'scatter',
  })
  return {
    series: series,
    legendData: legendData,
  }
}

const KEY_MAP = {
  'PM25': 'PM{subFs|2.5}',
  'PM10': `PM{subFs|10}`,
  'SO2': `SO{subFs|2}`,
  'NO2': `NO{subFs|2}`,
  'NO3-': 'NO{subFs|3}{supFs|-}',
  'SO42-': 'SO{subFs|4}{supFs|2-}',
  'NH4+': 'NH{subFs|4}',
  'CL-': 'CL{supFs|-}',
  'NA+': 'NA{supFs|+}',
  'K+': 'K{supFs|+}',
  'MG2+': 'MG{supFs|2+}',
  'CA2+': 'Ca{supFs|2+}',
  'NH3': 'NH{subFs|3}',
  'NOX': 'NO{subFs|x}',
  'VOCS': 'VOCs'

}



const LEG_KEY_MAP = {
  'PM25': '{pl4|PM}{subFs|2.5}',
  'PM1': '{pl4|PM}{subFs|1.0}',
  'PM5': '{pl4|PM}{subFs|5.0}',
  'PM10': `{pl4|PM}{subFs|10}`,
  'SO2': `{pl4|SO}{subFs|2}`,
  'NO2': `{pl4|NO}{subFs|2}`,
  'O3': `{pl4|O}{subFs|3}`,
  'NO3-': '{pl4|NO}{subFs|3}{supFs|-}',
  'SO42-': '{pl4|SO}{subFs|4}{supFs|2-}',
  'NH4+': '{pl4|NH}{subFs|4}{supFs|+}',
  'CL-': '{pl4|Cl}{supFs|-}',
  'NA+': '{pl4|Na}{supFs|+}',
  'K+': '{pl4|K}{supFs|+}',
  'MG2+': '{pl4|Mg}{supFs|2+}',
  'CA2+': '{pl4|Ca}{supFs|2+}',
  'OC': '{pl4|OC}',
  'EC': '{pl4|EC}',
  'SOR': '{pl4|SOR}',
  'NOR': '{pl4|NOR}',
  'NH3': '{pl4|NH}{subFs|3}',
  'HNO2': '{pl4|HNO}{subFs|2}',
  'HNO3': '{pl4|HNO}{subFs|3}',
  'PO43-': '{pl4|PO}{subFs|4}{supFs|3-}',
  'HUM': '湿度',
  'TEM': '温度',
  'WIND_POWER': '风',
  'WSPD': '风速',
  'WIND_DIRECTION': '风向',
  'WINDDIRECTION': '风向',
  'TEMPERATURE': '湿度',
  'TUMIDITY': '温度',
  'WINDPOWER': '风',
  'WINDSPEED': '风速',
  'ZH': 'AQI', // 综合
  'F-': '{pl4|F}{supFs|-}',
  'NO2-': '{pl4|NO}{subFs|2}{supFs|-}',
  'Al':'Al',
  'Si':'Si',
  'K':'K',
  'Ca':'Ca',
  'V':'V',
  'Cr':'Cr',
  'Mn':'Mn',
  'Fe':'Fe',
  'Co':'Co',
  'Ni':'Ni',
  'Cu':'Cu',
  'Zn':'Zn',
  'Ga':'Ga',
  'As':'As',
  'Se':'Se',
  'Pd':'Pd',
  'Ag':'Ag',
  'Cd':'Cd',
  'Sn':'Sn',
  'Sb':'Sb',
  'Ba':'Ba',
  'Au':'Au',
  'Hg':'Hg',
  'Tl':'Tl',
  'Pb':'Pb',
  'Cl':'Cl',
  'HCl':'HCl',
  'NOISE': '噪声',
  'NOX': '{pl4|NO}{subFs|x}',
  'VOC': '{pl4|VO}{subFs|c}',
  'NH3': '{pl4|NH}{subFs|3}',
  'VOCS': 'VOCs'
}


// 下标格式化
export const formatterPol = (name) => {
  let key = name.toUpperCase()
  let html = KEY_MAP[key]
  if (html) {
    return html
  }
  return key
}
export const formatterLegPol = (name) => {
  // 先用name查找
  let key = name
  let html = LEG_KEY_MAP[key]
  if (html) {
    return html
  } else {
    // 尝试用大写查找
    key = name.toUpperCase()
    html = LEG_KEY_MAP[key]
    if (html) {
      return html
    }
  }
  return key
}

export const pollutionUnits = (key) => {
  var chartsTitle =  '(mg/m³)'
  switch (key) {
    case 'co':
      chartsTitle = ' (mg/m³)';
      break;
    case 'no':
    case 'no2':
    case 'o3':
    case 'pm10':
    case 'pm25':
    case 'so2':
      chartsTitle + ' (μg/m³)';
      break;
    case 'hum':
      chartsTitle = "(%)";
      break;
    case 'tem':
      chartsTitle = "(℃)";
      break;
    case 'aqi':
      chartsTitle = "";
      break;
    case 'tvoc':
      chartsTitle = ' (mg/m³)';
      break;
    case 'noise':
      chartsTitle = '(dB)';
      break;
    case 'noiseLeg':
      chartsTitle =  ' (dB)';
      break;
    case 'noiseLmax':
      chartsTitle = ' (dB)';
      break;
    case 'noiseLmin':
      chartsTitle = ' (dB)';
      break;
    case 'o3H8':
      chartsTitle = 'O3_8H'
      break;
    case 'o3H8Max':
      chartsTitle = 'O3_8H(Max)'
      break;
    default:
      break;
  }
  return chartsTitle;
}

export const setTooltip = (lableFs) =>  {
  return {
    trigger: 'axis',
    formatter: (params) => {
       let str = `${params[0].name}<br/>`
       params.map((item, i) => {
        str+= `<p><i style="color: ${item.color}; font-size: ${lableFs*2}px; float: left; font-style: normal;margin-right: 5px">•</i> ${formatterSub(item.seriesName)}:  ${item.value || ''}</p>`
       })
       return str
    },
  }
}

export const newline = (option, number, axis) => {
  /* 此处注意你的json是数组还是对象 */
  option[axis][0]['axisLabel']={
      interval: 0,
      formatter: function(params){
          var newParamsName = "";
          var paramsNameNumber = params.length;
          var provideNumber = number;
          var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
          if (paramsNameNumber > provideNumber) {
              for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                      tempStr = params.substring(start, paramsNameNumber);
                  } else {
                      tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
              }
          } else {
              newParamsName = params;
          }
          return newParamsName
      }
  }
  return option;
}
