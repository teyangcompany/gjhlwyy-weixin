<template>
  <div class="page">
    <app-header title="历史礼券" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="main relative" ref="main">
      <coupons-item v-for="index in list" :data="index" :key="index.id"></coupons-item>
      <div class="nodata center absolute" v-if="nodata">
        您暂时没有历史礼券
      </div>
    </div>
  </div>
</template>

<script>
  import api from "../../lib/api"
  import weuijs from 'weui.js'
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import CouponsItem from "../../plugins/user/coupons-item"

  export default {
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
      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.mycoupon.history.list', {
          pageSize: 1000
        });
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
    background-color: #f5f5f5;
    padding: px2rem(20px, 750) 0;
    .nodata {
      @include t_r_b_l();
      background-image: url(../../../static/img/my/coupons-no.png);
      @include backgroundImageSet(px2rem(484px, 750), px2rem(325px, 750), center, px2rem(325px, 750));
      padding-top: px2rem(325px+325px+90px, 750);
      color: #666666;
      font-size: px2rem(28px, 750);
    }
  }
</style>
