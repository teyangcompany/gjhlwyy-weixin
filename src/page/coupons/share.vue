<template>
  <div class="page coupons-share">
    <div class="pat" ref="pat">
      <div class="ava">
        <img :src="userInfo.patAvatar" alt="">
      </div>
      <div class="name center">
        {{userInfo.patName}}
      </div>
    </div>
    <div class="main relative" ref="main">
      <img src="../../../static/img/coupons/back2@2x.png" alt="">
      <div class="info absolute">
        <div class="title center">
          送您 <span>180元</span>健康礼券<br>
          邀请您体验浙二好医生
        </div>
        <div class="step center">
          <p>1、点击下方按钮，下载APP</p>
          <p>2、复制邀请码，在注册时输入</p>
          <h3 class="code">{{info.inviteCode}}</h3>
          <div class="copy" :data-clipboard-text="info.inviteCode" @click="copy">点击复制</div>
        </div>
      </div>
    </div>
    <div class="bottom fixed">
      <div class="btn absolute">
        <a @click="download" class="block center">下载APP立刻领取</a>
      </div>
      <div class="text absolute center">
        浙二好医生，掌上健康管家
      </div>
    </div>
    <div class="open-in-brower center fixed" v-if="inWeixin">
      <img src="../../../static/img/open-in-brower.png" alt="">
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import api from '../../lib/api'
  import {isBindMixin} from "../../lib/mixin";

  export default {
    data() {
      return {
        info: {},
        userInfo: {},
        inWeixin: false
      };
    },
    computed: {},
    components: {},
    mixins: [isBindMixin],
    created() {
      this.initData();
    },
    mounted() {
      this.init();
    },
    beforeDestroy() {

    },
    methods: {

      init() {
        let patEl = this.$refs.pat,
          mainEl = this.$refs.main;
        if (!patEl) {
          setTimeout(this.init, 20);
        } else {
          let offset = patEl.getBoundingClientRect(),
            {height} = offset;
          height && (mainEl.style.height = `${window.innerHeight - height}px`);
        }
      },
      copy() {
        let copy = new Clipboard('.copy');
        copy.on("success", (res) => {
          weuijs.toast("复制成功！");
        })
      },
      download() {
        if (window.brower == 'weixin') {
          this.inWeixin = true;
        } else {

        }
      },

      async initData() {
        let userInfo = await this._isBind();
        if (userInfo) {
          this.userInfo = userInfo;
          await this.getCode();
        }
      },

      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.activity.details', {
          userScene: 'INVITE_REGISTER'
        })
        loading.hide();
      },

      async getStatus() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.activity.status', {userScene: 'INVITE_REGISTER'})
        loading.hide();
      },


      async getCode() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.pat.code.get', {})
        loading.hide();
        if (ret.code == 0) {
          this.info = ret.obj;
        } else {
          weuijs.alert(ret.msg);
        }
        return
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .coupons-share {
    * {
      line-height: 1;
    }
    background-image: url("../../../static/img/coupons/back1@2x.png");
    @include backgroundImageSet();
    .pat {
      padding-top: px2rem(64px, 750);
      .ava {
        $w: 142px;
        $d: px2rem($w, 750);
        $p: px2rem($w - 2px, 750);
        @include w_h($d, $d);
        margin: 0 auto;
        border: 1px solid white;
        border-radius: 50%;
        img {
          @include w_h($p, $p);
          border-radius: 50%;
        }
      }
      .name {
        padding-bottom: px2rem(28px, 750);
        padding-top: px2rem(20px, 750);
        font-size: px2rem(32px, 750);
        color: white;
      }
    }
    .main {
      width: px2rem(650px, 750);
      margin: 0 auto;
      img {
        width: 100%;
      }
      .info {
        @include t_r_b_l();
        .title {
          padding-top: px2rem(70px, 750);
          height: px2rem(220px, 750);
          font-size: px2rem(36px, 750);
          line-height: 1.5;
          color: #333333;
          font-weight: bold;
          span {
            color: #ff5c5c;
          }
        }
        .step {
          padding-top: px2rem(55px, 750);
          p, .code, .copy {
            color: #333333;
            font-size: px2rem(28px, 750);
          }
          p {
            padding-bottom: px2rem(60px, 750);
          }
          .code {
            padding-bottom: px2rem(50px, 750);
            font-size: px2rem(80px, 750);
          }
          .copy {

          }
        }
      }
    }
    .bottom {
      bottom: 0;
      left: 0;
      @include backgroundImageSet();
      background-image: url("../../../static/img/coupons/back3@2x.png");
      @include w_h(px2rem(750px, 750), px2rem(327px, 750));
      .text, .btn {
        bottom: px2rem(30px, 750);
        left: 0;
        width: 100%;
      }
      .btn {
        bottom: px2rem(100px, 750);
        a {
          color: white;
          line-height: px2rem(98px, 750);
          margin: 0 auto;
          font-size: px2rem(32px, 750);
          @include backgroundImageSet();
          background-image: url("../../../static/img/coupons/but@2x.png");
          @include w_h(px2rem(600px, 750), px2rem(98px, 750));
        }
      }
      .text {
        color: white;
        font-size: px2rem(28px, 750);
      }
    }
    .open-in-brower {
      @include t_r_b_l();
      background-color: rgba(0, 0, 0, .5);
      img {
        width: px2rem(620px, 750);
      }
    }
  }
</style>
