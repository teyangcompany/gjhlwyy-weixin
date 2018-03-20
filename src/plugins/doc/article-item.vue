<template>
  <div>
    <router-link tag="div" class="article-item"
                 :to="{path:'/articleDetail',query:{articleId:item.articleId}}">
      <div class="flex">
        <div class="name flex1 ellipsis">{{ item.title }}</div>
        <div class="tag flex0" v-if="item.isGrade">推荐</div>
      </div>
      <p class="flex">
        <span class="flex1">{{item.createTime|formatTime('%Y/%m/%d')}}</span>
        <span class="flex0">{{ item.readTimes }}阅读</span></p>
    </router-link>
    <div class="space-line"></div>
  </div>
</template>

<script>
  import {formatTime} from "../../lib/filter";

  export default {
    props: ['item'],
    data() {
      return {};
    },
    filters: {formatTime},
    computed: {},
    components: {},
    mixins: [],
    created() {

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

  div + div {
    .space-line {
      @include border(top);
    }
  }

  .article-item {
    padding-top: px2rem(10px);
    padding-bottom: px2rem(10px);
    div {
      line-height: px2rem(22px);
      font-size: px2rem(18px);
      color: #666666;
      .tag {
        border-radius: 10px;
        padding: 0px 5px;
        color: orange;
        border: 0.5px orange solid;
        font-size: px2rem(12px);
      }
    }
    p:nth-child(2) {
      margin-top: px2rem(10px);
      font-size: px2rem(15px);
      color: #ABA9A9;
    }
  }
</style>
