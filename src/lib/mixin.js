import {openidCache} from "./cache"
import api from "./api"
import {getENV} from "./util";

export const isLoginMixin = {
  data() {
    return {
      path: ""
    }
  },
  created() {
    this.path = this.$route.path
    console.log(this.path)
    let openid = openidCache.get();
    // if (!openid) {
    //
    //   this.$router.push({
    //     path:"/bindRelativePhone",
    //     query:{backPath:this.path}
    //   })
    // }
  },
  watch: {
    "$route": function () {
      this.path = this.$route.path

      // this.$router.push("/profile")

    }
  }
}
/**
 * 不用滚动组件，中间滚动区域的计算
 * @type {{mounted: (function())}}
 */
export const mainHeightMixin = {
  mounted() {
    this._calcMainHeight();
  },
  methods: {
    _calcMainHeight() {
      let h = 0;
      if (this.$refs.bottom) {
        h += 45;
      }
      if (this.$refs.footer) {
        h += 60;
      }
      if (this.$refs.header) {
        h += 45;
      }
      if (this.$refs.main) {
        this.$refs.main.style.height = `${window.innerHeight - h}px`;
      }
    }
  }
}
/**滚动组件计算滚动高度**/
export const scrollHeightMixin = {
  data() {
    return {
      scrollHeight: 0
    }
  },
  created() {
    this._calcScrollHeight();
  },
  methods: {
    _calcScrollHeight() {
      let h = window.innerHeight - 45;
      if (this.bottomHeight) {
        h = h - this.bottomHeight;
      }
      this.scrollHeight = h;
    }
  }
}
/**判断是openid否绑定,后续继续扩展
 * 获得认证状态
 * **/
export const isBindMixin = {
  data() {
    return {}
  },
  methods: {
    _isBind() {
      return api("nethos.pat.info.get").then((res) => {
        if (res.code == 0) {
          return res.obj;
        } else {
          return false
        }
      })
    }
  }
}
/**
 * 头像错误路径处理
 * @type {{methods: {__avaError(*): void}}}
 */
export const avaErrorMixin = {
  methods: {
    __avaError(e) {
      let dom = e.target, dataset = dom.dataset, src = "./static/img/pat.m.jpg";
      dataset && dataset.gender && (src = `./static/img/pat.${dataset.gender.toLowerCase()}.jpg`);
      dom.src = src;
    }
  }
}
/**
 * jssdk
 * @type {{data(): *, created(): void, methods: {getJssdkConfig(): Promise<undefined>}}}
 */
export const jssdkMixin = {
  data() {
    return {
      jssdkMixin_jssdkConfig: null
    }
  },
  methods: {
    async jssdkMixin_getJssdkConfig() {
      if (this.jssdkMixin_jssdkConfig) {
        wx.config(this.jssdkMixin_jssdkConfig);
        return true;
      }
      let appid = getENV().appid,
        ret = await api('smarthos.wechat.jsapiticket.get', {
          reqUrl: location.href.split('#')[0],
          appid
        });
      if (ret.code == 0) {
        this.jssdkMixin_jssdkConfig = ret.obj;
        wx.config(this.jssdkMixin_jssdkConfig);
        return true;
      }
      return false;
    }
  }
}
/*android 输入框自动滚动至可视区域*/
export const scrollIntoViewMixin = {
  created() {
    this.scrollIntoView_timer = null;
    if (window.device === 'android') {
      this.scrollIntoView_timer = setInterval((res) => {
        let tag = document.activeElement.tagName.toLowerCase();
        if (tag === 'input' || tag == 'textarea') {
          document.activeElement.scrollIntoViewIfNeeded();
        }
      }, 300);
    }
  },
  beforeDestroy() {
    clearInterval(this.scrollIntoView_timer);
    this.scrollIntoView_timer = null;
  }


}

export const doBackMixin = {
  created() {
    if (!this.jssdkMixin_jssdkConfig) {
      this.doBackMixin_getJssdkConfig()
    }
  },
  methods: {
    doBackMixin_doBack() {
      if (history.length <= 1) {
        wx && wx.closeWindow();
      } else {
        this.$router.go(-1);
      }
    },
    async doBackMixin_getJssdkConfig() {
      let ret = await this.jssdkMixin_getJssdkConfig();
      console.log(ret);
    }
  }
}
