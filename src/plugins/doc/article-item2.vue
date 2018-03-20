<template>
  <router-link tag="li"
               :to="{path:'/articleDetail',query:{articleId:item.docArticle.articleId}}"
               class="lh1 item">
    <h3 class="flex">
      <div class="name color_333 flex1">{{item.docArticle.title}}</div>
      <div class="tag flex0" v-if="item.docArticle.isGrade">推荐</div>
    </h3>
    <div class="flex info color_999">
      <div class="ava flex0">
        <img :src="item.sysDoc|docAva" alt="">
      </div>
      <div class="name flex0">
        {{item.sysDoc.docName}}
      </div>
      <div class="time flex1">
        {{item.docArticle.createTime|formatTime('%Y/%m/%d')}}
      </div>
      <div class="num flex0">
        {{item.docArticle.readTimes}} 阅读
      </div>
    </div>
  </router-link>
</template>

<script>
  import docAva from '../../utils/docAva'
  import {formatTime} from "../../lib/filter";

  export default {
    props: ['item'],
    data() {
      return {};
    },
    computed: {},
    filters: {docAva, formatTime},
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

  h3 {
    align-items: center;
    font-size: px2rem(18px);
    line-height: 1.2;
    .name {
      @include lines(2);
    }
  }

  .tag {
    color: orange;
    font-size: px2rem(12px);
    border: 0.5px solid orange;
    padding: 4px 6px;
    border-radius: 10px;
  }

  .info {
    margin-top: $commonSpace;
    align-items: center;
    font-size: px2rem(14px);
    .ava {
      $w: px2rem(30px);
      @include w_h($w, $w);
      img {
        @include w_h($w, $w);
        border-radius: 50%;
      }
    }
    .name, .ava {
      margin-right: px2rem(10px);
    }
  }

  .item{
    background-color: white;
    padding: $commonSpace;
  }

  li + li {
    margin-top: $commonSpace;
  }
</style>
