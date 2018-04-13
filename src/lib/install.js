import Vue from 'vue'
import Api from './api'
import * as util from './util'
import weuijs from 'weui.js'

import AppHeader from '../plugins/app-header'
import Msg from '../plugins/msg'


export default {
  install() {
    /*添加实例方法*/
    Vue.prototype.$http = Api;
    Vue.prototype.$util = util;
    Vue.prototype.$weuijs = weuijs;

    /*添加全局mixin*/
    Vue.mixin({
      components: {AppHeader, Msg}
    });
  }
}
