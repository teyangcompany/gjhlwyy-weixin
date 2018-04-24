<template>
  <div class="page">
    <app-header title="我的礼券" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <div class="info">
        <div class="icon center">
          <img src="../../../static/img/my/coupons-ok.png" alt="">
        </div>
        <div class="text center" v-if="list.length>0">
          <p>恭喜您获得了总价值<span>￥{{info.activityCouponMoney/100}}</span>礼券</p>
          <p>已存入您的账户,您可以前往“我的-我的礼券”查看</p>
        </div>
        <div class="text center" v-else>
          <p>暂无优惠券</p>
        </div>
      </div>
      <div class="btn">
        <router-link to="/internetroom" replace class="center">继续使用</router-link>
      </div>
      <div class="list">
        <coupons-item v-for="index in list" :data="index" :key="index.id"></coupons-item>
      </div>
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import api from "../../lib/api"
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import CouponsItem from '../../plugins/user/coupons-item'

  export default {
    data() {
      return {
        info: {},
        list: [],
        nodata: false
      };
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader, CouponsItem},
    created() {
      this.getList();
      this.getCode();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getCode() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.pat.code.get', {})
        loading.hide();
        if (ret.code == 0) {
          this.info = ret.obj;
        } else {
          //weuijs.alert(ret.msg);
        }
      },
      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.mycoupon.list', {
          pageSize: 1000
        })
        if (ret.code == 0) {
          if (!ret.list || ret.list.length == 0) {
            this.nodata = true;
          }
          this.list = ret.list;
        } else {
          weuijs.alert(ret.msg || "接口错误" + ret.code);
        }
        loading.hide();
      }

    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .main {
    background-color: #f8f8f8;
    * {
      line-height: 1;
    }
    .info {
      .icon {
        padding-bottom: px2rem(60px, 750);
        padding-top: px2rem(80px, 750);
        img {
          width: px2rem(280px, 750);
        }
      }
      .text {
        p:first-child {
          font-size: px2rem(36px, 750);
          color: #333333;
          span {
            color: #ff6c6c;
          }
        }
        p:nth-child(2) {
          margin-top: px2rem(24px, 750);
          font-size: px2rem(22px, 750);
        }
      }
    }
    .btn {
      margin-top: px2rem(40px, 750);
      a {
        margin: 0 auto;
        display: block;
        width: px2rem(630px, 750);
        @include h_lh(px2rem(80px, 750));
        color: white;
        background-color: $mainColor;
      }
    }
    .list {
      margin-top: px2rem(50px, 750);
      padding-bottom: px2rem(50px, 750);
    }
  }
</style>
