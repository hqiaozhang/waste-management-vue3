/*
 * @Author: zhanghongqiao 
 * @Date: 2022-05-24 09:42:02 
 * @Email: 991034150@qq.com 
 * @Description: 企业、单位管理
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-05-24 09:45:32
 */


  
export const fetchList = {
  url: '/pollution/queryListPage',
  // disableHost: true,
  config: {
    method: 'POST', 
  },
}

// 设置企业涉废类型
export const fetchSaveInvolve = {
  url: '/involve/saveInvolve'
}

// 查询企业涉废类型
export const fetchLicenseType = {
  url: '/involve/licenseType'
}

