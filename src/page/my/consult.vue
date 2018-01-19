<template>
  <div class="my-consult page flex">
    <app-header title="我的咨询" class="flex0">
      <i slot="back" class="back"></i>
    </app-header>
    <ul class="my-consult-nav flex flex0">
      <router-link tag="li" to="/my/consult/all" exact-active-class="hover" replace :style="liStyle"
                   class="flex0 center fs40">全部
      </router-link>
      <router-link tag="li" exact-active-class="hover" replace :to="{path:'/my/consult/'+item.value}" :style="liStyle"
                   class="flex0 center fs40"
                   v-for="(item,index) in statusArr" :key="index"
                   v-if="showStatus.indexOf(item.value)>=0">
        {{item.title}}
      </router-link>
    </ul>
    <router-view class="flex1"></router-view>
  </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {CONSULT_STATUS} from "../../lib/config";
  import {isBindMixin} from "../../lib/mixin";

  export default {
    data() {
      return {
        liStyle: {},
        statusArr: CONSULT_STATUS,
        showStatus: [0, 2, 4]
      };
    },
    computed: {},
    mixins: [isBindMixin],
    components: {AppHeader},
    async created() {
      this.$set(this.liStyle, "width", `${100 / (this.showStatus.length + 1)}%`);
      let ret = await this._isBind();
      if (ret === false) {
        this.$router.replace({
          path: "/bindRelativePhone",
          query: {backPath: this.$route.path}
        });
        return;
      }

      if (this.$route.fullPath === '/my/consult') {
        this.$router.replace('/my/consult/all');
      }
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

  .fs40 {
    font-size: px2rem(40px, 1080);
  }

  .my-consult {
    flex-direction: column;
  }

  ul {
    line-height: px2rem(105px, 1080);
  }

  li {
    &.hover {
      color: $mainColor;
      @include border(bottom, $mainColor, after, solid, 4px);
    }
  }
</style>
