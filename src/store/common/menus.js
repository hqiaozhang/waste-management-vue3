/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-07 21:06:45
 * @Email: 991034150@qq.com
 * @Description: 顶部导航数据请求
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-07-11 16:04:05
 */
import { getCookie } from '@/utils/util'
import { fetch } from '@/utils/request'
 
let topActiveId = sessionStorage.getItem('topActiveId')
let leftActiveId = sessionStorage.getItem('leftActiveId')
const haveSideMenu =  sessionStorage.getItem('haveSideMenu')
const  isClickTop = sessionStorage.getItem('isClickTop')
const isOpenSideMenu = sessionStorage.getItem('isOpenSideMenu')
const state = {
  topActiveId: topActiveId, // 污染溯源
  topMenuList: [],
  leftActiveId: leftActiveId,
  isOpenSideMenu: isOpenSideMenu == 'true' ? true : false,
  haveSideMenu: haveSideMenu == 'true' ? true : false,
  rootMenu: [],
  isClickTop: isClickTop == 'true' ? true : false,
}

 

// 顶部导航actions
/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 获取头部导航数据
   * @param {function} {commit}
   */
  topMenuRequest ({commit}, params) {
    let user = getCookie('wasteUserName')
    fetch('fetchMenus', params, (data) => { 
     
      if(_.isEmpty(data)) {
        return 
      }  
      //  测试代码
       data = data[(user || 'cf')  +'Menus'].result  
        //  测试代码end
       let topMenus = data.first 
        
      commit('topMenuSuccess', topMenus)
      commit('setSideMenu', data) 
      commit('setRootMenu',  data)
      commit('setCurrentTopMenuId', topActiveId)  // 设置顶部菜单当前Id 
      commit('setSideMenuState',  haveSideMenu == 'true' ? true : false )
    })
  }
}
// 顶部导航mutations
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state
   * @param {array} data
   */
  topMenuSuccess (state, data) {
    state.topMenuList = data
  },
  /**
   * 
   * @param {object} state 
   * @param {string} path 当前路由
   */
  setCurrentTopMenuId(state, id) {
    state.topActiveId = id 
    state.isClickTop = true 
    sessionStorage.setItem('topActiveId', id) 
    sessionStorage.setItem('isClickTop', true) 
  },
   /**
   * 设备左边菜单的默认展开项
   * @param {Object} state 
   * @param {*} id 
   */ 
  setSideMenuDefActive(state, id) {
    sessionStorage.setItem('leftActiveId', id)
    state.leftActiveId = id
    state.isClickTop = false 
    sessionStorage.setItem('isClickTop', false) 
  },

  /**
   * 菜单展开，收缩状态
   * @param {*} state 
   * @param {*} flag 
   */
  setOpenSideMenu(state, flag) {
    state.isOpenSideMenu = flag
    sessionStorage.setItem('isOpenSideMenu', flag)
  },

  /**
   * 是否展示左侧菜单
   * @param {*} state 
   * @param {*} flag 
   */
  setSideMenuState(state, flag) {   
    sessionStorage.setItem('haveSideMenu', flag)
    state.haveSideMenu = flag
  }, 

  setSideMenu(state, data) {
    state.rootMenu = data 
  }, 
  /**
   * 获取所有菜单
   * @param {*} state 
   * @param {*} data 
   */
  setRootMenu(state, data) {
    state.rootMenu = data 
  } 
}

export default {
  namespaced: true,
  state, 
  actions,
  mutations
}
