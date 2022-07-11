/*
 * @Author: zhanghongqiao
 * @Date: 2018-07-06 15:54:54
 * @Email: 991034150@qq.com
 * @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 17:01:53
 */

import { getCookie, setCookie } from '@/utils/util'
let userId = getCookie('userId')  
const state = {
  logged: !userId,
  userId: userId,
  wasteToken: getCookie('wasteToken'),
  cityId: Number(getCookie('cityId')), 
  fullName: decodeURI(getCookie('fullName')), 
}
 

// 登录mutations
const mutations = {
  /**
   * @description 设置登录状态
   * @param {object} state 状态
   * @param {array} data 数据
   */
  setLoginState (state, logged) {
    state.logged = logged
    mutations.setUserId(state, getCookie('userId'))
    mutations.setUserName(state, decodeURI(getCookie('fullName'))) 
  }, 
  /**
   * 设置用户id
   * @param state
   * @param userId
   */
  setUserId (state, userId) { 
    state.userId = userId
  },

  /**
   * 设置用户名
   * @param state
   * @param userId
   */
  setUserName (state, fullName) {  
    state.fullName = fullName
  },
  /**
   * 设置城市类型
   * @param state
   * @param userId
   */
  setToken (state, token) {
    setCookie('wasteToken', token)
    state.wasteToken = token
  },
   
}

export default {
  namespaced: true,
  state, 
  mutations
}
