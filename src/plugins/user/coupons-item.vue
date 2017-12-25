<template>
  <div class="coupons-item relative" :class="['status'+status]">
    <div class="container flex">
      <div class="info flex1">
        <div class="name">新用户注册礼券</div>
        <div class="desc">限图文咨询使用</div>
        <div class="sub">10元直减券</div>
      </div>
      <div class="price flex0">
        <div class="num">
          <i>￥</i><span>10</span>
        </div>
        <div class="btn" v-if="status==0">
          <a href="">去使用</a>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="time">
        有效期2017.12.22至2018.01.12
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['data'],
    data() {
      return {
        status: 0
      };
    },
    computed: {},
    components: {},
    created() {
      this.status = this.data % 3;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .coupons-item + .coupons-item {
    margin-top: px2rem(20px, 750);
  }

  .coupons-item {
    $w: 690px;
    $h: 270px;
    margin-left: px2rem(30px, 750);
    @include w_h(px2rem($w, 750), px2rem($h, 750));
    background-image: url(../../../static/img/my/coupons-bg.png);
    @each $i in 1, 2 {
      &.status#{$i} {
        background-image: url("../../../static/img/my/coupons-bg-#{$i}.png");
      }
    }
    @include backgroundImageSet();
    .container {
      * {
        line-height: 1;
      }
      height: px2rem(200px, 750);
      padding-top: px2rem(40px, 750);
      padding-left: px2rem(30px, 750);
      padding-right: px2rem(30px, 750);
      .name {
        font-size: px2rem(34px, 750);
        color: #333333;
        font-weight: bold;
      }
      .desc, .sub {
        font-size: px2rem(24px, 750);
        color: #333333;
      }
      .desc {
        margin-top: px2rem(30px, 750);
      }
      .sub {
        margin-top: px2rem(16px, 750);
      }
      .num {
        i, span {
          color: #F4888C;
        }
        i {
          font-style: normal;
          font-size: px2rem(36px, 750);
        }
        span {
          font-size: px2rem(68px, 750);
        }
      }
      .btn {
        a {
          background-color: #F4888C;
          width: px2rem(100px, 750);
          @include h_lh(px2rem(42px, 750));
          display: block;
          text-align: center;
          color: white;
          font-size: px2rem(22px, 750);
          margin-top: px2rem(30px, 750);
          border-radius: px2rem(21px, 750);
        }
      }
    }
    .bottom {
      padding-left: px2rem(30px, 750);
      height: px2rem(70px, 750);
      .time {
        font-size: px2rem(22px, 750);
        color: #333333;
        line-height: px2rem(70px, 750);
      }
    }
    .mask {
      @include t_r_b_l();
      background-color: rgba(153, 153, 153, .2);
    }

    /*已使用已失效*/
    &.status1, &.status2 {
      .container {
        .price {
          padding-top: px2rem(78px, 750);
        }
        .num {
          i, span {
            color: #999999;
          }
        }
      }
    }

  }


</style>
