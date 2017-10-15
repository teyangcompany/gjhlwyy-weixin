// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import api from './lib/api'
import weui from 'weui.js'
import {getParamsFromUrl, makeUrl} from "./lib/util"
import {openidCache, tokenCache} from './lib/cache'

import auth2 from "./lib/auth2";

// localStorage.setItem('gjhlwyy_openid_',"59c36e06e4b04bf65c099cfa")

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
Vue.use(weui)
Vue.config.productionTip = false

/*
 * 移动端rem布局
 * width:20rem
 * */
// let socketUrl =  getSocket()
window.socket = io("nethoswebsocket.diandianys.com");
window.socket.on('connect', function () {
  api("nethos.push.deviceid.register", {
    token: tokenCache.get(),
    deviceId: openidCache.get()
  }).then((data) => {
    console.log(data, 55555)
  })
});


socket.on("pushevent", function (data) {
  console.log('收到推送')
  console.log(data, 22222)
})


if (window.device == "iphone" || window.device == "android") {
  let w = window.innerWidth;
  document.querySelector('html').style.fontSize = `${w / 20}px`;
}

let currentUrl = location.href;
//alert(currentUrl)
let p = getParamsFromUrl(currentUrl)
console.log(currentUrl, p);
if (!p.query) {
  p.query = {
    v: window.version
  }
  //alert(makeUrl(p))
  location.replace(makeUrl(p));
} else {
  auth2(init);
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
