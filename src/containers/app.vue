/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 18:27:03
* @Description: 应用程序模板入口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-07-11 16:04:58
*/

<template> 
      <!-- 路由跳转部分 -->
   <router-view > </router-view>
</template>

<script> 
// import { fetch } from "@/utils/request"; 
export default {
   setup(props) {
     
   },
   mounted() {
    // 获取顶部菜单数据数据
    this.$store.dispatch('menus/topMenuRequest', {userId: this.userId, menuType: 5}) 
    // 获取头部右边地区列表数据
    this.$store.dispatch('areaInfo/areaListRequest') 
   },
};
</script>