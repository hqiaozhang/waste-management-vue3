/*
* @Author: xiexiaoying
* @Date: 2021-12-16 09:12
* @Email: 634021337@qq.com
* @Description:
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-07-11 15:25:33
*/
 
import { createRouter, createWebHashHistory} from "vue-router";
 
// 配置项
import config from '@/config/base.config'
// 登录
// const Login = () => import('@/containers/login/index.vue')
// 首页
const Home = () => import('@/containers/home/index.vue')
 
const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: `/index`,
    component: Home // 首页
  },
  // {
  //   path:`/login`, // 登录
  //   name: '登录',
  //   component: Login,
  // },
  {
    path:`/index`,  
    name: '首页',
    component: Home,  
  },  
]
 
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }


// export default new Router({
//   // mode: 'history',
//   // base: config.routerPath, 
//   routes
// })

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

