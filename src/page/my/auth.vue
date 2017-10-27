<template>
  <div class="auth page flex">
    <app-header title="实名认证" class="flex0">
      <i slot="back"></i>
    </app-header>
    <div class="main">
      <ul>
        <li class="flex">
          <div class="icon flex0"><img src="../../../static/img/yy.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">医院认证</div>
            <div class="desc">绑定医院账号即完成认证</div>
          </div>
          <div class="right flex0">
            <span>点击认证</span>
          </div>
        </li>
        <li class="flex">
          <div class="icon flex0"><img src="../../../static/img/ga.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">公安认证</div>
            <div class="desc">由公安系统对您的姓名、<br>身份证号进行认证</div>
          </div>
          <div class="right flex0"></div>
        </li>
        <li class="flex">
          <div class="icon flex0"><img src="../../../static/img/yys.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">运营商认证</div>
            <div class="desc">由运营商对您的姓名、<br>身份证号、手机号进行认证</div>
          </div>
          <div class="right flex0"></div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header.vue"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {AppHeader},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .auth {
    flex-direction: column;
    .main {
      li + li {
        @include border(top);
      }
      li {
        padding: 10px;
        align-items: center;
        .icon {
          margin-right: 10px;
          img {
            width: 60px;
          }
        }
        .text {
          .name {
            font-size: 16px;
          }
          .desc {
            line-height: 1.3;
            padding-top: 5px;
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
