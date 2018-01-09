<template>
  <div class="page">
    <app-header title="推荐有礼" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <div class="banner overflow-hidden">
        <img src="../../../static/img/my/coupon-banner.png" alt="">
      </div>
      <div class="info">
        <div class="title center">
          我的专属邀请码
        </div>
        <div class="code center">
          {{info.inviteCode}}
        </div>
        <div class="link center">
          <router-link to="/coupons/explain">活动说明</router-link>
          <img src="../../../static/img/arrow.png" alt="">
        </div>
        <div class="desc center">
          每邀请<span>1人</span>,您可获得<span>{{info.activityCouponMoney/100}}元</span>礼券
        </div>
        <div class="line"></div>
        <div class="btn">
          <a @click="share" class="center">立即邀请</a>
        </div>
      </div>
      <div class="list" :class="[nodata?'nodata':'']">
        <h3 class="center" v-if="nodata">
          您还没有成功邀请好友
        </h3>
        <h3 class="center" v-if="!nodata">
          您已成功邀请了{{list.length}}位好友
        </h3>
        <ul>
          <li class="flex" v-for="index in list">
            <div class="name flex1">{{index.promotedName.substr(0,1)}}**</div>
            <div class="mobile flex0">{{index.promotedMobile|formatCardAndMobile(3,4,4)}}</div>
          </li>
        </ul>
        <div class="center" v-if="nodata">
          <img src="../../../static/img/my/coupons-no-2.png" alt="">
        </div>
      </div>
    </div>
    <img class="absolute" v-if="device=='iphone'" v-show="isShowMask" @click="isShowMask=false"
         src="../../../static/img/share.ios.png" alt="">
    <img class="absolute" v-if="device=='android'" v-show="isShowMask" @click="isShowMask=false"
         src="../../../static/img/share.android.png"
         alt="">
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {isBindMixin, jssdkMixin, mainHeightMixin} from "../../lib/mixin";
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import {debug, getENV, getParamsFromUrl, getShareLink, makeUrl} from "../../lib/util";
  import {formatCardAndMobile} from "../../lib/filter";
  import {openidCache} from "../../lib/cache";

  export default {
    data() {
      return {
        device: '',
        isShowMask: false,
        token: '',
        nodata: false,
        info: {},
        userInfo: {}
      };
    },
    computed: {
      list() {
        return this.info.promoteRecordList ? this.info.promoteRecordList : []
      }
    },
    filters: {formatCardAndMobile},
    mixins: [mainHeightMixin, jssdkMixin, isBindMixin],
    components: {AppHeader},
    async created() {
      this.device = window.device;
      this.token = openidCache.get();
      this.userInfo = await this._isBind();
      await this.getCode();
      await this.getDetail();
      await this.setShare();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      share() {
        if (window.brower == 'weixin') {
          this.isShowMask = true;
        }
      },
      getLogo() {
        let options = getParamsFromUrl(location.href),
          env = getENV();
        options.path += 'static/img/logo.web.png';
        options.query = null;
        options.hash = "";
        return makeUrl(options);

      },
      getShareLink() {
        let options = getParamsFromUrl(location.href),
          env = getENV();
        debug('options', options);
        options.hash = "/coupons/share?";
        options.path = '/gjhlwyy';
        options.hostname = env.jssdk;
        let params = {
          name: this.userInfo.patName,
          avator: this.userInfo.patAvatar,
          code: this.info.inviteCode
        }, str = '';

        for (let k in params) {
          params[k] && (str += `&${k}=${encodeURIComponent(params[k])}`);
        }
        options.hash += str.substr(1);


        return getShareLink(makeUrl(options));
      },
      async setShare() {
        let isOk = await this.jssdkMixin_getJssdkConfig();
        if (isOk) {
          let doc = this.userInfo,
            conf = {
              title: doc.patName + ` 送您${this.info.activityCouponMoney / 100}元健康礼券邀请您体验浙二好医生`,
              link: this.getShareLink(),
              imgUrl: this.getLogo(), // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              },
              desc: doc.patName + ` 送您${this.info.activityCouponMoney / 100}元健康礼券邀请您体验浙二好医生`, // 分享描述
              type: 'link', // 分享类型,music、video或link，不填默认为link
              dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            };
          debug('share', conf);
          wx.ready(() => {
            wx.onMenuShareTimeline(conf);
            wx.onMenuShareAppMessage(conf);
          })
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
          if (!this.info.promoteRecordList || this.info.promoteRecordList.length === 0) {
            this.nodata = true;
          }
        } else {
          weuijs.alert(ret.msg);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    > img {
      @include t_r_b_l();
      width: 100%;
      height: 100%;
    }
  }

  .main {
    * {
      line-height: 1;
    }
    background-color: #F8F8F8;
    %banner {
      @include w_h(px2rem(750px, 750), px2rem(200px, 750));
    }
    .banner {
      @extend %banner;
      img {
        @extend %banner;
      }
    }
    padding-bottom: px2rem(30px, 750);

    .info, .list {
      margin: 0 auto;
      margin-top: px2rem(30px, 750);
      width: px2rem(690px, 750);
      background-color: white;
      border-radius: 12px;
      border: 1px solid #cccccc;
    }

    .info {
      padding-bottom: px2rem(24px, 750);
      .title {
        margin-top: px2rem(60px, 750);
        font-size: px2rem(26px, 750);
        color: #333333;
      }
      .code {
        margin-top: px2rem(20px, 750);
        font-size: px2rem(90px, 750);
        color: #333333;
        font-weight: bold;
      }
      .link {
        margin-top: px2rem(40px, 750);
        font-size: px2rem(24px, 750);
        a {
          color: #999999;
        }
        img {
          height: px2rem(24px, 750);
        }
      }
      .desc {
        margin-top: px2rem(60px, 750);
        font-size: px2rem(26px, 750);
        color: #999999;
        span {
          color: #f4888c;
        }
      }
      .line {
        margin-top: px2rem(30px, 750);
        @include border();
      }
      .btn {
        padding-top: px2rem(24px, 750);
        a {
          margin: 0 auto;
          display: block;
          border-radius: px2rem(12px, 750);
          color: white;
          background-color: $mainColor;
          width: px2rem(630px, 750);
          @include h_lh(px2rem(80px, 750));
        }
      }

    }

    .list {
      padding-top: px2rem(60px, 750);
      h3 {
        color: #333333;
        font-size: px2rem(30px, 750);
      }

      ul {
        padding-top: px2rem(26px, 750);
        li + li {
          @include border(top);
        }
        li {
          height: px2rem(82px, 750);
          width: px2rem(630px, 750);
          margin: 0 auto;
          align-items: center;
          font-size: px2rem(28px, 750);
          color: #999999;
          .name {
            padding-left: px2rem(78px, 750);
          }
          .mobile {
            padding-right: px2rem(78px, 750);
          }
        }
      }

      &.nodata {
        h3 {
          color: #999999;
        }
        div {
          padding-top: px2rem(100px, 750);
          img {
            width: px2rem(306px, 750);
          }
        }
      }
    }
  }
</style>
