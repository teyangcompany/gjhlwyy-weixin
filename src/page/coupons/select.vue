<template>
  <div class="page">
    <app-header title="我的礼券" ref="header">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <div class="list">
        <coupons-item v-if="index.couponStatus=='UNUSED'" next="select" :key="index.id" v-for="index in list"
                      :data="index" :showbtn="false"></coupons-item>
      </div>
      <div class="nodata center" v-if="nodata">
        您还没有礼券
      </div>
    </div>
    <div class="foot flex" ref="footer">
      <a @click="handler" class="center">不使用礼券</a>
    </div>
  </div>
</template>

<script>
  import weuijs from 'weui.js'
  import api from '../../lib/api'
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import CouponsItem from "../../plugins/user/coupons-item"
  import {couponsCache} from "../../lib/cache";

  export default {
    name: 'coupons-my',
    data() {
      return {
        list: [],
        nodata: false
      };
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader, CouponsItem},
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handler() {
        couponsCache.set({});
        this.$router.go(-1);
      },
      async getList() {
        let {query} = this.$route,
          {currentService, payMoney} = query;
        payMoney = parseFloat(payMoney) * 100;
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.mycoupon.list', {
          pageSize: 1000, currentService, payMoney
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

  .page {
    background-color: #F8F8F8;
  }

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

  .foot {
    flex-direction: column-reverse;
    height: 60px;
    a {
      width: 100%;
      @extend %a;
    }
  }
</style>
