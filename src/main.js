// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuelidate from 'vuelidate'
import api from './lib/api'
import {getParamsFromUrl, makeUrl} from "./lib/util"
import {openidCache, tokenCache} from './lib/cache'

import auth2 from "./lib/auth2";

// localStorage.setItem('gjhlwyy_openid_',"59c36e06e4b04bf65c099cfa")


/*import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

Raven
  .config('https://560617c4d52b474d8d693f1967013b42@sentry.io/264845')
  .addPlugin(RavenVue, Vue)
  .install();*/


Vue.use(Vuelidate)
Vue.config.productionTip = false
/*Vue.config.errorHandler = (...args) => {
  console.log(args);
}*/

// let socketUrl =  getSocket()
window.socket = io("nethoswebsocket.diandianys.com");
window.socket.on('connect', function () {
  api("nethos.push.deviceid.register", {
    token: tokenCache.get(),
    deviceId: openidCache.get()
  }).then((data) => {
  })
});

socket.on("pushevent", function (data) {
  console.log('收到推送')
  console.log(data, 22222)
});


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
