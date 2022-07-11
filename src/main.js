/*
 * @Author: zhanghongqiao
 * @Date: 2018-06-04 19:41:01
 * @Email: 991034150@qq.com
 * @Description: 入口文件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-07-11 16:02:27
 */

import { createApp } from 'vue'
import App from './containers/app.vue'
import { router } from './router'  
import store from './store' 
import _ from 'lodash'
// 渲染前处理(引入所有API)
import preLoader from './utils/loader/loader'
import mockAPI from './api/mockIndex' 
// ========================================================
// Mock & Config Setup
// 渲染前设置配置项和mock API，config为子模块配置项
// ========================================================
preLoader.load({
  config: {},
  apis: mockAPI
})
 

// import './permission.js'

router.beforeEach((to, from, next) => {
  document.title = to.name 
  next() 
})

let app = createApp(App)
app.use(router)
app.use(store)  
app.use(_)
app.mount('#root')



 