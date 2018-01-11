<template>
  <div class="page">
    <app-header title="我的礼券" ref="header">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <router-link v-if="activityStatus" tag="div" to="/coupons/recommended"
                   class="recommended weui-cell weui-cell_access">
        <div class="weui-cell__hd"><img src="../../../static/img/my/recommended.png" alt=""
                                        style="width:22px;margin-right:7px;display:block"></div>
        <div class="weui-cell__bd flex">
          <p class="flex1 name">推荐有礼</p>
          <p class="flex0 text">邀请好友得礼券</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <div class="list">
        <coupons-item :key="index.id" v-for="index in list" :data="index"></coupons-item>
      </div>

      <div class="nodata center" v-if="nodata">
        您还没有礼券
      </div>

      <div class="link center">
        <router-link to="/coupons/history">查看历史礼券</router-link>
        <span> | </span>
        <router-link to="/coupons/explain">礼券说明</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import api from '../../lib/api'
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import CouponsItem from "../../plugins/user/coupons-item"

  export default {
    name: 'coupons-my',
    data() {
      return {
        activityStatus: true,
        list: [],
        nodata: false
      };
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader, CouponsItem},
    created() {
      this.getDetail();
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getDetail() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.activity.details', {
          userScene: 'INVITE_REGISTER'
        });
        if (ret.code == 0) {
          this.activityStatus = ret.obj.activityStatus
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
        loading.hide();
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
    position: relative;
    background-color: #f8f8f8;
    .recommended {
      background-color: white;
      .name {
        color: #333333;
      }
      .text {
        color: #999999;
      }
      .text, .name {
        font-size: px2rem(32px, 750);
      }
    }
    .list {
      padding: px2rem(20px, 750) 0 px2rem(85px, 750) 0;
      background-color: #f8f8f8;
    }
    .nodata {
      position: absolute;
      @include t_r_b_l();
      top: 50px;
      background-image: url(../../../static/img/my/coupons-no.png);
      @include backgroundImageSet(px2rem(484px, 750), px2rem(325px, 750), center, px2rem(325px, 750));
      padding-top: px2rem(325px+325px+90px, 750);
      color: #666666;
      font-size: px2rem(28px, 750);
    }
    .link {
      background-color: #F8F8F8;
      position: fixed;
      @include t_r_b_l(1);
      line-height: 1;
      padding-top: px2rem(20px, 750);
      padding-bottom: px2rem(30px, 750);
      a {
        font-size: px2rem(24px, 750);
        color: #666666;
      }
    }
  }
</style>
