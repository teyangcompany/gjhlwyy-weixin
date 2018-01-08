<template>
  <div class="page explain">
    <app-header title="礼券说明" ref="header">
      <i slot="back"></i>
    </app-header>
    <div class="main relative" ref="main">
      <div class="contain absolute">
        {{content}}
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header"
  import {mainHeightMixin} from "../../lib/mixin";
  import weuijs from 'weui.js'
  import api from '../../lib/api'

  export default {
    data() {
      return {
        content: ''
      };
    },
    computed: {},
    mixins: [mainHeightMixin],
    components: {AppHeader},
    created() {
      this.getExplain();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getExplain() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('smarthos.coupon.model.explain', {});
        if (ret.code == 0) {
          this.content = ret.obj.content;
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .explain {
    .main {
      background-color: $mainColor;
      .contain {
        left: $commonSpace;
        right: $commonSpace;
        top: $commonSpace;
        bottom: $commonSpace;
        background-color: white;
        padding: $commonSpace;
      }
    }
  }
</style>
