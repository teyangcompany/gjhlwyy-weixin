<template>
  <div class="team-info lh1">
    <h3 class="center">{{info.teamName}}</h3>
    <div class="flex score" v-if="info.teamScoure">
      <div class="flex0 name">{{info.teamScoure|formatScore}}</div>
      <star class="flex0" :size="36" :score="info.teamScoure"></star>
      <router-link :to="{path:'/team/'+info.id+'/rate'}" tag="div" class="flex0 text">查看</router-link>
    </div>
    <div class="center score-no" v-else>
      暂无评分
    </div>
  </div>
</template>

<script>
  import {formatScore} from "../../lib/filter";
  import Star from '../../base/star/star'

  export default {
    props: ['info'],
    data() {
      return {};
    },
    computed: {},
    filters: {formatScore},
    components: {Star},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .team-info {
    background-color: white;
    padding-bottom: px2rem(15px);
    h3 {
      color: #333333;
      font-size: px2rem(17px);
      padding: px2rem(14px);
    }
    .score-no {
      font-size: px2rem(15px);
      color: #777777;
    }
    .score {
      justify-content: center;
      align-items: center;
      .name {
        color: #666666;
        font-size: px2rem(24px);
        margin-right: px2rem(10px);
      }
      .text {
        margin-left: px2rem(10px);
        font-size: px2rem(15px);
        color: $mainColor;
      }
    }

  }
</style>
