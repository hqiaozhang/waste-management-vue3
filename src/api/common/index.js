
// 菜单导航 
import cfMenus from './data/cfMenu'
import jyMenus from './data/jyMenu'
import ysMenus from './data/ysMenu'
import jgMenus from './data/jgMenu'
export const fetchMenus = {
  url: '/function/v2/getFunctionByUserId',
  enableMock: true, // 是否使用本地假数据
  mock: {
    "erroCode": 2000, 
    "erroMsg": null, 
    "result": {
      cfMenus,
      jyMenus,
      ysMenus,
      jgMenus
    },
  }
}


// 右边地区
import fetchAreaList from './areaListMock'  
// 登录
export const fetchLogin = {
  url: '/auth/login',
  // enableMock: true, // 是否使用本地假数据
  config: {
    method: 'POST',
    contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  },
  mock: {
    "erroCode":2000,
    "erroMsg":"登录成功！",
    "result":{
      "token":"d1aa6f04-a4ce-41e2-821c-a3fda3e06cf2-yulin-develop",
      "appFlag":1,
      "auditorFlag":0,
      "bigFlag":1,
      "cityType":"2",
      "domainId":"510100",
      "domainName":"成都市",
      "firstPage":"/waste-management/#/index",
      "fullName":"admin",
      "gridFlag":1,
      "parentDomainId":"510000",
      "reviewOfficerFlag":0,
      "status":2,
      "userId":"4028f481585db7d701585dc9f8a00018",
      "userName":"admin"
    }
  }
}


// 退出登录
export const fetchLogout = {
  url: '/auth/logout',
  config: {
    method: 'POST',
  },
}

// 修改密码
export const fetchChangePwd = {
  url: '/sysuser/updatePersonalPwd',
  config: {
    method: 'POST',
    contentType: 'multipart/form-data',
    isMsg: true, // 是否需要后端的msg
  },
}
 

export const fetchFooter = {
  url: '/config/getFooter',
  enableMock: true,
  mock: {
    "erroCode":2000,
    "erroMsg":"",
    "result":"智慧水务平台由北京蛙鸣华清环保科技有限公司运营 提供技术支持<span>建议使用<a href='https://pc.qq.com/detail/1/detail_2661.html' target='_blank'>Chrome</a>浏览器访问平台</span>"
  }
}



export {
  fetchAreaList,  
}


