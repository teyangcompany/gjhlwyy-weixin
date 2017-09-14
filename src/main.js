// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import wx from "./lib/wx"

import {openidCache} from "./lib/cache"

let UA = window.navigator.userAgent.toLocaleLowerCase();
if (/iphone/.test(UA)) {
  window.device = "iphone";
}
if (/android/.test(UA)) {
  window.device = "android";
}

if (/micromessenger/.test(UA)) {
  window.brower = "weixin";
} else {
  window.brower = "";
}


Vue.use(Vuelidate)
Vue.config.productionTip = false
// Vue.mixin({
//   created: function () {
//     var myOption = this.$options.myOption
//     var token = localStorage.getItem("token")
//     if (!token) {
//      this.$router.push('/login')
//     }
//   }
// })

/*
 * 移动端rem布局
 * width:20rem
 * */
if (window.device == "iphone" || window.device == "android") {
  let w = window.innerWidth;
  document.querySelector('html').style.fontSize = `${w / 20}px`;
}


let openid = openidCache.get();
let params = url("?");
let re = encodeURIComponent(location.href);
if (window.brower == "weixin") {
  if (openid) {
    init();
  } else if (!openid && !params.code && !params.state) {
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6e3551dee5f7e716&redirect_uri=${re}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=wxe24cab30ebb1e366#wechat_redirect`;
    location.href = url;
  } else if (!openid && params.code && params.state) {
    alert(params.code);
    wx("smarthos.wechat.user.get.bycode", {code: params.code})
      .then((res) => {
        alert(JSON.stringify(res));
      })
  }
} else {
  init();
}


function init() {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App},
    myOption: 'hello!'
  });
}
