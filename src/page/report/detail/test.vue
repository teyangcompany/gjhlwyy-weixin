<template>
    <div class="page flex">
        <app-header title="体检报告详情">
            <i class="back" slot="back"></i>
        </app-header>
        <ul class="nav flex">
            <li class="flex0 center" :class="[index==currentIndex?'cover':'']" @click="currentIndex=index"
                v-for="(item,index) in navs">{{item.name}}
            </li>
        </ul>
        <div class="main flex1 overflow-y-auto overflow-touch">

        </div>
    </div>
</template>

<script>
  import {compatCache, testCache} from "../../../lib/cache"

  const NAVS = [
    {name: '体检结果'},
    {name: '医生建议'},
    {name: '体检报告'},
  ]

  export default {
    data() {
      return {
        currentIndex: 0,
        navs: NAVS,
        pat: {},
        info: {}
      };
    },
    computed: {},
    components: {},
    mixins: [],
    created() {
      this.info = testCache.get();
      this.pat = compatCache.get();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getData() {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('zheer.yygh.ApiJyjcService.ExamListDetails', {})
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../../common/public";

    .page {
        flex-direction: column;
    }

    .main {
        background: $bgColor;
    }

    .nav {
        li {
            width: (100%/3);
            @include h_lh(40px);
        }
        .cover {
            @include border(bottom, $mainColor, after, solid, 4px);
        }
    }
</style>
