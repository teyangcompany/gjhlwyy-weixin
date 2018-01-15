<template>
  <div class="page flex my-doc">
    <app-header class="header flex0" ref="header" title="我的医生">
    </app-header>
    <ul class="flex flex0 nav">
      <router-link active-class="active" :to="{path:'/my/doc/'+data.name}" tag="li" class="flex0 center"
                   v-for="(data,index) in navs"
                   :key="index" replace>
        {{data.value}}
      </router-link>
    </ul>
    <router-view class="flex1"></router-view>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header.vue"
  import {isBindMixin} from "../../lib/mixin"
  import {MY_DOC_NAV} from "../../lib/config";

  export default {
    mixins: [isBindMixin],
    data() {
      return {
        navs: MY_DOC_NAV
      };
    },
    computed: {},
    components: {
      AppHeader,
    },
    async created() {
      let ret = await this._isBind();
      if (!ret) {
        this.$router.replace({
          path: "/bindRelativePhone",
          query: {backPath: this.$route.fullPath}
        });
      } else if (this.$route.path == '/my/doc') {
        this.$router.replace('/my/doc/msg');
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {

    },
    watch: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    flex-direction: column;
    .nav {
      li {
        width: 50%;
        @include h_lh(px2rem(105px, 1080));
        @include border();
        &.active {
          background-color: #eff5f3;
          &::after {
            border-bottom: 4px solid $mainColor;
          }
        }
      }
    }
  }
</style>
