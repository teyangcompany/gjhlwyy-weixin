<template>
    <div class="page">
        <app-header title="历史礼券" ref="header">
            <i slot="back"></i>
        </app-header>
        <div class="main relative" ref="main">
            <coupons-item v-for="index in 3" :data="index" :key="index"></coupons-item>
            <div class="nodata center absolute" v-if="nodata">
                您暂时没有历史礼券
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
      return {
        nodata: false
      };
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
