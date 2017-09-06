import Vue from 'vue'
import Router from 'vue-router'
import health from '../components/health/router'
import index from '../components/index/router'
import my from '../components/my/router.js'
import service from '../components/service/router'
import bindAccount from '../components/bindAccount/router'
import login from '../components/bindAccount/login'
import blankPage from '../components/blankPage.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:"/blankPage/:id",
      component:blankPage
    },
    {
      path:"/login",
      component:login
    },
    ...index,
    ...my,
    ...bindAccount,
    ...service,
    ...health
  ]
})
