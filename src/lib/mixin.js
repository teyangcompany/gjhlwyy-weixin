import {openidCache} from "./cache"
import api from "./api"
import {debug} from "./util";

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
        debug("用户信息", res);
        if (res.code == 0) {
          return res.obj;
        } else {
          return false
        }
      })
    }
  }
}

export const avaErrorMixin = {
  methods: {
    __avaError(e) {
      let dom = e.target, dataset = dom.dataset, src = "./static/img/pat.m.jpg";
      dataset && dataset.gender && (src = `./static/img/pat.${dataset.gender.toLowerCase()}.jpg`);
      dom.src = src;
    }
  }
}
