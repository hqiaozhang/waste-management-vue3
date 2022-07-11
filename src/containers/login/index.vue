/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 15:24:44
* @Description: 登录
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-06-21 16:58:48
*/

<template>
  <div class="login-page" :style="{height: `${domH}px`}">
    <div id="page-container" class="page-posi">
      <!-- begin login -->
      <div class="login animated fadeInDown">
        <div class="login-container-m">
          <!-- begin brand -->
          <div class="logo"></div>
          <!-- end brand -->
          <div class="login-content">
            <form @submit.prevent="submit" name="loginForm" id="loginForm" class="margin-bottom-0">
              <p>账户</p>
              <div class="form-group m-b-15">
                <input type="text"  autocomplete="off" @input="getUsername" :value="username" name="username" placeholder="用户名"/>
              </div>
              <p class="pwd">密码</p>
              <div class="form-group m-b-15">
                <input type="password" autocomplete="off" @input="getPassword" name="password" placeholder="密码"/>
              </div> 
              <div class="login-buttons">
                <input type="submit" class="btn btn-success btn-block btn-sm" value="登录"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import "./index.scss" 
  import {fetch} from '@/utils/request'
  import {getCookie, setCookie, messagePopup} from '@/utils/util'
  import config from '@/config/base.config'

  let host = config.proxyHost

  export default {
    data() {
      return {
        domH: window.innerHeight,
        inputtext: {},
        host: host,
        username: '', // 用户名
        password: '', // 密码
        code: '', // 验证码
        loading: '', // 加载中提示
      }
    },
    
    components: {}, 
    mounted() { 
      this.setStore()
      
    },
    methods: {
      submit() {
        // 验证判断
        if (this.validateForm() == true) {
          this.loading = this.$loading({
            text: '正在登录',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.3)'
          })
          // 获取参数
          let params = {
            username: this.username,
            password: this.password,
            businessType: 5,
          }
          setCookie('userName', this.username)
          let fullNames = {
            cf: '产废001',
            ys: '运输001',
            jy: '经营001',
            jg: '监管001'
          }
          fetch('fetchLogin', params, (data) => { 
            this.loading.close() // 关闭加载中
            if (data.erroCode == 2000) {  
              const { userId, token, domainId, domainName, parentDomainId } = data.result
              setCookie('userId', userId) 
              setCookie('fullName', encodeURI(fullNames[this.username] || '测试')) 
              this.$store.commit('userInfo/setToken', data.result.token) 
              // 登录成功(状态设置)
              this.$store.commit('userInfo/setLoginState', false)
              let cityInfo = {
                id: data.result.domainId,
                domainName,
                parentDomainId 
              } 
              this.$store.commit('areaInfo/setAreaInfo', cityInfo)

              setTimeout(() => { 
                 this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              }, 200) 
            } else {
              messagePopup(data.erroMsg, 'error')
            }
          })
        }
      },
      /*
       * 验证表单字段是否为空
       */
      validateForm() {
        const {username, password} = this
        // 用户名验证
        if (_.isEmpty(username)) {
          messagePopup('用户名不能为空 !')
          return false
        }
        // 密码验证
        if (_.isEmpty(password)) {
          messagePopup('密码不能为空 !')
          return false
        }

        return true
      },
      /** 用户名*/
      getUsername(e) {
        this.username = e.target.value
      },
      /** 用户名密码 */
      getPassword(e) {
        this.password = e.target.value
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      },
      setStore() { 
        this.$store.commit('menus/setSideMenuState', false)
        this.$store.commit('menus/setCurrentTopMenuId', null)
        this.$store.commit('menus/setSideMenuDefActive', null)
        this.$store.commit('userInfo/setLoginState', true)
        sessionStorage.clear()
      }

    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    }
  };
</script>