import Vue from 'vue'
import Router from 'vue-router'
import health from '../components/health/router'
import index from '../components/index/router'
import my from '../components/my/router.js'
import service from '../components/service/router'
import bindAccount from '../components/bindAccount/router'
import scanBind from '../components/scanBind/router'
import login from '../components/bindAccount/login'
import blankPage from '../components/blankPage.vue'
import menuMy from '../components/menuMy'
import internetTerms from '../components/internetTerms'
import download from '../page/download.vue'
import promote from "../page/promote.vue"
import Search from "../page/search.vue"
import hospital from "./hos"
import team from './team'
import coupons from './coupons'
import doc from './doc'
import news from './news'
import account from './account'
import report from './report'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/pay-demo',
      component: () => import('../components/demo')
    },
    {
      path: "/search",
      component: Search
    },
    {
      path: "/promote",
      component: promote
    },
    {
      path: "/download/:type",
      component: download
    },
    {
      path: "/blankPage/:id",
      component: blankPage
    },
    {
      path: "",
      component: login
    },
    {
      path: "/profile",
      component: menuMy
    },
    {
      path: "/internetTerms",
      component: internetTerms
    },
    ...index,
    ...my,
    ...bindAccount,
    ...service,
    ...health,
    ...scanBind,
    ...hospital,
    ...team,
    ...coupons,
    ...doc,
    ...news,
    ...account,
    ...report
  ]
})
