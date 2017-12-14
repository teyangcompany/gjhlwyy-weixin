<template>
  <div class="page">
    <div class="weui-msg" v-if="code!=0">
      <div class="weui-msg__icon-area"><i :class="icon" class="weui-icon_msg"></i></div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">{{code == 2 ? "感谢关注" : "抱歉"}}</h2>
        <p class="weui-msg__desc" :class="['color'+this.code]" v-html="text">
          {{text}}
        </p>
        <p v-if="[1,2].indexOf(code)>=0" class="weui-msg__desc">
          推广人:{{record.remark}} <br>
          推广码:{{record.code}} <br>
          推广时间:{{record.promotedTime | Todate}} <br>
        </p>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <router-link to="/internetRoom" replace class="weui-btn weui-btn_default">开始使用</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {openidCache} from "../lib/cache";
  import api from "../lib/api"
  import {debug} from "../lib/util"
  import weui from "weui.js"
  import {isBindMixin} from "../lib/mixin"
  import {Todate} from "../lib/filter"

  export default {
    data() {
      return {
        code: 0,
        record: {},
        msg: ""
      };
    },
    mixins: [isBindMixin],
    filters: {Todate},
    computed: {
      icon() {
        let iconClass = "", code = parseInt(this.code);
        switch (code) {
          case 0:
            iconClass = ""
            break;
          case 1:
            iconClass = "weui-icon-warn";
            break;
          case 2:
            iconClass = "weui-icon-success";
            break;
          case 3:
            iconClass = "weui-icon-warn"
            break;
          default :
            iconClass = "weui-icon-warn"
        }
        return iconClass;
      },
      text() {
        let showText = "", code = parseInt(this.code);
        switch (code) {
          case 0:
            break;
          case 1:
            showText = "您已经领取过小礼品了"
            break;
          case 2:
            showText = "请向工作人员领取您的小礼品"
            break;
          case 3:
            showText = "您已经在其他渠道注册过了，<br/>不满足领奖条件。"
            break;
          default :
            showText = this.msg;
        }
        return showText;
      }
    },
    components: {},
    created() {
      this.__init();
      /*this._isBind().then((res) => {
        if (res !== false) {
          this.__init();
        } else {
          this.$router.push({
            path: "/bindRelativePhone",
            query: {backPath: this.$route.fullPath}
          });
        }
      })*/
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async __init() {
        let code = 0, openid = openidCache.get(), query = this.$route.query, loading = weui.loading("加载中...");
        query && query.code && (code = query.code);
        let ret = await api("smarthos.promote.record.wechat.insert", {code: code, openid});
        loading.hide();
        this.code = ret.code;
        this.record = ret.obj || {}
        this.msg = ret.msg;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  .weui-btn-area {
    margin: 20px;
  }

  .color3 {
    color: $mainColor;
  }

  .color1, .color2 {
    color: green;
  }
</style>
