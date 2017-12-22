<template>
  <div class="page">
    <app-header title="我的礼券" ref="header">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <router-link to="/coupons/recommended" class="weui-cell weui-cell_access">
        <div class="weui-cell__hd"><img src="../../../static/img/my/recommended.png" alt=""
                                        style="width:22px;margin-right:7px;display:block"></div>
        <div class="weui-cell__bd">
          <p>推荐有礼</p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <div class="list">
        <coupons-item :key="index" v-for="index in 10"></coupons-item>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import CouponsItem from "../../plugins/user/coupons-item"

  export default {
    data() {
      return {};
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader, CouponsItem},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .main {
    .list {
      padding: px2rem(20px, 750) 0;
      background-color: #f8f8f8;
    }
  }
</style>
