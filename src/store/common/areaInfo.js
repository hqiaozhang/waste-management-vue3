/*
 * @Author: zhanghongqia 
 * @email: 991034150@qq.com 
 * @Date: 2018-06-02 11:09:45 
 * @Description: 地区列表数据获取
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 17:01:47
 */

import { getCookie, setCookie } from '@/utils/util'
import { fetch } from '@/utils/request'

const state = {
  cityName: decodeURI(getCookie('cityName')), 
  areaList: []
}

// 地区列表actions
/**
 * Action 可以包含任意异步操作。
 * Action 通过 store.dispatch 方法触发(该方法在组件内调用)
 */
const actions = {
  /**
   * @description 获取地区列表数据
   * @param {function} {commit}
   */
  areaListRequest ({commit}) {
    fetch('fetchAreaList', (data) => {
       commit('areaListSuccess', data)
    })
  }
}
// 地区列表mutations
/**
 * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
 * Mutation 必须是同步函数
 * mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。
 */
const mutations = {
  /**
   * @description 数据获取成功
   * @param {object} state 状态
   * @param {array} data 数据
   */
  areaListSuccess (state, data) {
    state.areaList = data
  },

   /**
   * @description 设置地区信息(id,名称)
   * @param {object} state 状态
   * @param {array} data 数据
   */
    setAreaInfo (state, city) {
      state.cityId = Number(city.id)
      state.cityName = city.domainName 
      setCookie('cityName', encodeURI(city.domainName) )  
    },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
