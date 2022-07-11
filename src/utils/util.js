/*
 * @Author: zhanghongqiao@hiynn.com
 * @Date: 2018-04-18 11:05:26
 * @Description: 共用方法
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2022-07-11 10:22:16
 */
// import { Message, Loading } from 'element-ui';

 /**
 *
 * TODO //对Date的扩展，将 Date 转化为指定格式的String //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用
 * 1-2 个占位符， //年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) //例子： //(new
 * Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 //(new
 * Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18 Date
 * 2015年6月23日下午1:31:48 Author liuylong
 */
Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "H+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds()
      // 毫秒
  };
  if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
          .substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
              (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

/**
 *  获取某个范围的随机数
 *  @param    {number}  min 最大值
 *  @param    {number}  max 最小值
 *  @return   {object}  null
 */
export const randomNumber = (min, max) => {
  let range = max - min
  let rand = Math.random()
  let num = min + Math.round(rand * range)
  return num
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  const {length} = list
  let index = 0
  let value
  while (++index < length) {
    value = list[index]
    if (f(value, index, list)) {
      return value
    }
  }
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}

export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

export function isPromise(val) {
  return val && typeof val.then === 'function'
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`)
}

/**
 * 重置字体大小
 */
export function resetSize(type) {
  let docEl = document.documentElement
  let uiw = 1920

  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  let recalc = function () {
    // 以高度计算
    if(type ==  2) {
      var clientHeight = docEl.clientHeight;
      var uih = 1080
      if(clientHeight < 730) {
        uih = 1100
      }
      if (!clientHeight) return;
      docEl.style.fontSize = 100 * (clientHeight / uih) + 'px';
    }else {
      var clientWidth = docEl.clientWidth;
      if(clientWidth <= 768) {
        uiw = 750
      }
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / uiw) + 'px';
    }
  }
  if (!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  recalc()
  window.addEventListener('resize', function () {
    recalc()
  })
}


/**
 * 设置Cookie
 * @param {string} key
 * @param {*} val
 * @param {*} path
 */
export function setCookie(key, val, path) {
  if (!path) path = "/";
  document.cookie = key + "=" + val + "; expires=Session; path=" + path;  //设置cookie
}

/**
 * 获取Cookie
 * @param {string} key 获取 Cookie
 */
export function getCookie(key) {
  /*获取cookie参数*/
  let getCookie = document.cookie.replace(/[ ]/g, "");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
  let arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
  let tips;  //声明变量tips
  for (let i = 0; i < arrCookie.length; i++) {   //使用for循环查找cookie中的tips变量
    let arr = arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
    if (key == arr[0]) {  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
      tips = arr[1];   //将cookie的值赋给变量tips
      break;   //终止for循环遍历
    }
  }
  return tips;
}

/**
 *
 * 清空cookie
 * @export
 * @param {string} name
 */
export function clearCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 20);
  var cval = getCookie(name);
  if (cval != null) {
    console.log("=0" + cval + ";expires=" + exp.toGMTString())
    document.cookie = name + "=0" + cval + ";expires=" + exp.toGMTString();
  }
}

/**
 * 获取地址栏参数
 * @param {string} name
 */
export function getUrlParms(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return null
}

//  /**
//   * 消息提示框
//   * @param {Object} vm
//   * @param {String} text 提示信息
//   */
//  export function messagePopup(text, type, dur) {
//   Message({
//     message: text,
//     duration: dur || 1500, // 0 不关闭弹窗
//     center: true,
//     type: type || "info",
//     customClass: 'wm_message_tips'
//   });
// }


 

/**
 * 判断两个对象的属性是否完全相面
 * @param {Object} aObj 对象a
 * @param {Object} bObj 对象b
 */
export function isObjectValueEqual(aObj, bObj) {
  let aProps = Object.getOwnPropertyNames(aObj);
  let bProps = Object.getOwnPropertyNames(bObj);
  // console.log(aProps, bProps)
  if (aProps.length != bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if ( String(aObj[propName]) !== String( bObj[propName])) {
      return false;
    }
  }
  return true;
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
}

// export function loadingText(text, className) {
//   let loading = Loading.service({
//     text: text || '拼命加载中...',
//     spinner: 'el-icon-loading',
//     customClass: 'loading_wait',
//     background: 'rgba(0, 0, 0, 0.5)',
//     target: className ? document.querySelector(className) : document.body
//   });
//   return loading
// }

 

 
export function formatterSub(name) {
  return name
}