<template>
  <div class="page">
    <div class="weui-msg">
      <div class="weui-msg__icon-area"><i :class="icon" class="weui-icon_msg"></i></div>
      <div class="weui-msg__text-area">
        <h2 class="weui-msg__title">{{code == 2 ? "感谢关注" : "抱歉"}}</h2>
        <p class="weui-msg__desc" :class="['color'+this.code]" v-html="text">
          {{text}}
        </p>
        <p v-if="code!=3" class="weui-msg__desc">
          推广人:{{record.remark}} <br>
          推广码:{{record.code}} <br>
          推广时间:{{record.promotedTime}} <br>
        </p>
      </div>
      <div class="weui-msg__opr-area">
        <p class="weui-btn-area">
          <router-link to="/internetRoom" class="weui-btn weui-btn_default">开始使用</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../lib/api"
  import {debug} from "../lib/util"
  import weui from "weui.js"
  import {isBindMixin} from "../lib/mixin"

  export default {
    data() {
      return {
        code: 0,
        record: {}
      };
    },
    mixins: [isBindMixin],
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
        }
        return showText;
      }
    },
    components: {},
    created() {
      this._isBind().then((res) => {
        if (res !== false) {
          this.__init();
        } else {
          this.$router.push({
            path: "/bindRelativePhone",
            query: {backPath: this.$route.fullPath}
          });
        }
      })
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async __init() {
        let code = 0;
        this.$router.query && this.$router.query.code && (code = this.$router.query.code);
        let ret = await api("smarthos.promote.record.insert", {code: code});
        this.code = ret.code;
        this.record = ret.obj || {}
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
