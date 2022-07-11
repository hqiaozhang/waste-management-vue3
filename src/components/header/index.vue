<template>
  <div class="header">
   <div class="logo">
      <!-- <img v-if="logoUrl" :src="`${cHost}/file/view/${logoUrl}`">   -->
<!--      <img src="static/images/logo.png">-->
  </div>

    <div class="top_menus">
      <a :href="item.menuUrl" :class="{active: item.id==topActiveId}" @click="handleMenu(item)" v-for="item in menuList" :key="item.id">
         <i class="iconfont" v-html="item.iconUrl || '&#xe686;'"></i>
        <span>{{item.menuName}}</span>
      </a>
    </div>

    <!--右边导航部分-->
    <div class="right-select"> 
      <!--地区选择菜单-->
      <!-- <AreaMenu :areaList="areaList"
                :cityName="cityName" /> -->

        <!--用户名  -->
       <div class="user_name">
        <i class="iconfont">&#xe685;</i>
        {{userName}}
      </div>

      <!--系统设置菜单-->
      <!-- <Seting :logout="logout"
              :userName="userName"
              :requestChangePwd="requestChangePwd" /> -->
    </div>
  </div>
</template> 

<script>
export default {
  setup(props) {
    const menuList = props.menuList
    const logoUrl = props.logoUrl
    const menuList = props.menuList
    const areaList = props.areaList
    const logout = props.logout 
    const topActiveId = props.topActiveId
    const cityName = props.cityName
    const userName = props.userName

    return {
      menuList,
      logoUrl,
      menuList,
      areaList,
      logoUrl,
      logout,
      topActiveId,
      cityName,
      userName
    }
  }
}
</script>

<style>

</style>
