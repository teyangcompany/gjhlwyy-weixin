<template>
  <div class="page bg">
    <app-header title="常用就诊人">
      <i slot="back" class="back"></i>
      <div class="right absolute" slot="right">添加</div>
    </app-header>
    <scroll :height="scrollHeight" :data="list">
      <ul>
        <li class="flex" v-for="i in 5">
          <div class="flex1 lh1">
            <h3 class="flex">
              <div class="name fs40 color_333">李明卫</div>
              <div class="sex fs35 color_666">男</div>
              <div class="age fs35 color_666">32</div>
              <div class="status">
                <span class="fs30 color_999">已认证</span>
              </div>
            </h3>
            <div class="idcard flex fs35">
              <my-label class="flex0 color_999" title="身份证号"></my-label>
              <span class="flex1 color_777 fs35">92938393393</span>
            </div>
            <div class="phone flex fs35">
              <my-label class="flex0 color_999" title="手机号码"></my-label>
              <span class="flex1 color_777 fs35">92938393393</span>
            </div>
            <div class="medical flex fs35">
              <my-label class="flex0 color_999" title="病案号"></my-label>
              <span class="flex1 color_777 fs35">92938393393</span>
            </div>
          </div>
          <div class="flex0 icon">
            <img src="../../../static/img/arrow.png" alt="">
          </div>
        </li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {scrollHeightMixin} from "../../lib/mixin";
  import Scroll from '../../plugins/scroll'
  import MyLabel from '../../plugins/my-label'

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    components: {AppHeader, Scroll, MyLabel},
    mixins: [scrollHeightMixin],
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .fs40 {
    font-size: 16px;
  }

  .fs35 {
    font-size: 14px;
  }

  .fs30 {
    font-size: 12px;
  }

  li {
    background-color: white;
    padding: px2rem(60px, 1080) px2rem(40px, 1080);

    align-items: center;
    .my-label {
      margin-right: px2rem(30px, 1080);
      width: px2rem(65px, 375);
      justify-content: space-between;
    }

    .idcard, .phone, .medical {
      margin-top: px2rem(57px, 1080);
    }
  }

  li + li {
    margin-top: px2rem(27px, 1080);
  }

  ul {
    padding-top: px2rem(27px, 1080);
  }

</style>
