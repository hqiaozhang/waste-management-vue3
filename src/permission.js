import { createRouter } from "vue-router";
import { resetSize, getCookie, getUrlParms } from '@/utils/util' 
import baseconfig from '@/config/base.config'
const router = createRouter()

const whiteList = baseconfig.whiteList  // 白名单

router.beforeEach((to, from, next) => {
  document.title = to.name 
  next() 
})
